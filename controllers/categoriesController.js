const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Eliquid = require("../models/eliquid");
const { body, validationResult } = require("express-validator");

exports.categories_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).exec();
  if (allCategories === null) {
    const err = new Error("categories not found");
    res.statusCode = 404;
    next(err);
  }
  console.log(allCategories);
  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});

exports.categories_detail = asyncHandler(async (req, res, next) => {
  const [eliquidsInCategory, category] = await Promise.all([
    Eliquid.find({ category: req.params.id }),
    Category.findById(req.params.id),
  ]);
  res.render("category_details", {
    title: "Category Details",
    eliquids_list: eliquidsInCategory,
    category: category,
  });
});

exports.categories_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

exports.categories_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("enter a valid name (at least 3 characters)")
    .custom(async (value) => {
      const checkCategory = await Category.find({ name: value });
      if (checkCategory.length) {
        console.log("the category is " + checkCategory.length);
        throw new Error("Category name already created");
      } else {
        return true;
      }
    })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.categories_delete_get = asyncHandler(async (req, res, next) => {
  const [category, eliquidsInCategory] = await Promise.all([
    Category.findById(req.params.id),
    Eliquid.find({ category: req.params.id }),
  ]);

  if (category === null) {
    res.redirect("/catalog/categories");
  }
  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    eliquid_list: eliquidsInCategory,
  });
});

exports.categories_delete_post = [
  body("admin_key").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const category = Category.findById(req.params.id);
    if (category === null) {
      res.redirect("/catalog/");
    } else if (req.body.admin_key !== process.env.ADMIN_KEY) {
      res.render("category_delete", {
        title: "Delete Category",
        category: category,
        error: "Wrong Password",
        eliquid_list: [],
      });
    } else {
      await Category.findByIdAndDelete(req.params.id);
      res.redirect("/catalog/");
    }
  }),
];

exports.categories_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.render("category_form", { title: "Update Category", category: category });
});

exports.categories_update_post = [
  body("name", "Invalid name, it most have at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect(category.url);
    }
  }),
];
