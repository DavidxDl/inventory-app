const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
const eliquidController = require("../controllers/eliquidController");

router.get("/", categoryController.categories_list);

router.get("/eliquids/", eliquidController.index);

router.get("/category/create", categoryController.categories_create_get);

router.get("/eliquid/create", eliquidController.eliquid_create_get);

router.post("/eliquid/create", eliquidController.eliquid_create_post);

router.get("/eliquid/:id/delete", eliquidController.eliquid_delete_get);

router.post("/eliquid/:id/delete", eliquidController.eliquid_delete_post);

router.get("/eliquid/:id", eliquidController.eliquid_detail);

router.get("/categories/:id", categoryController.categories_detail);

module.exports = router;
