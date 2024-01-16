const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Eliquid = require("../models/eliquid");

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
  res.send(`display form for create  ${req.params.category} category TODO`);
});

exports.categories_create_post = asyncHandler(async (req, res, next) => {
  res.send(`send form for create  ${req.params.category} category TODO`);
});

exports.categories_delete = asyncHandler(async (req, res, next) => {
  res.send(`delete ${req.params.category} categorie TODO`);
});
