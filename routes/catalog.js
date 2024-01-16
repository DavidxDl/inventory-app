const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
const eliquidController = require("../controllers/eliquidController");

router.get("/", categoryController.categories_list);

router.get("/categories/:id", categoryController.categories_detail);

router.get("/eliquids/", eliquidController.index);

router.get("/eliquid/create", eliquidController.eliquid_create_get);

router.post("/eliquid/create", eliquidController.eliquid_create_post);

router.get("/eliquid/:id/delete", eliquidController.eliquid_delete_get);

router.post("/eliquid/:id/delete", eliquidController.eliquid_create_post);

router.get("/eliquid/:id", eliquidController.eliquid_detail);

module.exports = router;
