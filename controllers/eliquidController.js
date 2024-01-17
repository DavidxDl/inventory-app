const asyncHandler = require("express-async-handler");
const Eliquid = require("../models/eliquid");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const allEliquids = await Eliquid.find();
  res.render("eliquid_list", {
    title: "Eliquid List",
    eliquid_list: allEliquids,
  });
});

exports.eliquid_detail = asyncHandler(async (req, res, next) => {
  const eliquid = await Eliquid.findById(req.params.id)
    .populate("category")
    .exec();
  if (eliquid === null) {
    const err = new Error("eliquid not found");
    res.statusCode = 404;
    next(err);
    return;
  }
  console.log(eliquid);

  res.render("eliquid_detail", {
    title: eliquid.name,
    eliquid: eliquid,
    category: eliquid.category,
  });
});

exports.eliquid_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.render("eliquid_form", {
    title: "Create Eliquid",
    category_list: categories,
  });
});

exports.eliquid_create_post = [
  body("name", "Name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("description", "Description must contain at least 7 characters")
    .trim()
    .isLength({ min: 7 })
    .escape(),

  body("category", "category must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("price_small", "price must be at least 1$")
    .trim()
    .toInt()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    })
    .escape(),
  body("price_medium", "price must be at least 1$")
    .trim()
    .toInt()
    .escape()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    }),
  body("price_large", "price must be at least 1$")
    .trim()
    .toInt()
    .escape()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    }),
  body("stock_small", "stock must be at least 1$")
    .trim()
    .toInt()
    .escape()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    }),
  body("stock_medium", "stock must be at least 1$")
    .trim()
    .toInt()
    .escape()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    }),
  body("stock_large", "stock must be at least 1$")
    .trim()
    .toInt()
    .escape()
    .custom((value) => {
      if (value < 1) throw new Error("value most be greater than zero");
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const eliquid = new Eliquid({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: {
        small: req.body.price_small,
        medium: req.body.price_medium,
        large: req.body.price_large,
      },
      number_in_stock: {
        small: req.body.stock_small,
        medium: req.body.stock_medium,
        large: req.body.stock_large,
      },
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find();
      console.log(eliquid, req.body.category);
      res.render("eliquid_form", {
        title: "Create Eliquid",
        eliquid: eliquid,
        category_list: allCategories,
        errors: errors.array(),
      });
      return;
    } else {
      await eliquid.save();
      res.redirect(eliquid.url);
    }
  }),
];

exports.eliquid_delete_get = asyncHandler(async (req, res, next) => {
  const eliquid = Eliquid.findById(req.params.id);
  res.render("eliquid_delete", { title: "Delete Eliquid", eliquid: eliquid });
});
exports.eliquid_delete_post = asyncHandler(async (req, res, next) => {
  const eliquid = Eliquid.findById(req.params.id);
  if (eliquid === null) {
    res.redirect("/catalog/eliquids");
  } else {
    await Eliquid.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/eliquids");
  }
});
