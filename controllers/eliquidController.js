const asyncHandler = require("express-async-handler");
const Eliquid = require("../models/eliquid");
const Category = require("../models/category");

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

exports.eliquid_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet post form for create eliquid");
});

exports.eliquid_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet get form for delete eliquid");
});
exports.eliquid_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet post form for delete eliquid");
});
