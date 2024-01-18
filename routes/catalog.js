const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
const eliquidController = require("../controllers/eliquidController");

router.get("/", categoryController.categories_list);

router.get("/eliquids/", eliquidController.index);

router.get("/category/create", categoryController.categories_create_get);

router.post("/category/create", categoryController.categories_create_post);

router.get("/category/:id/update", categoryController.categories_update_get);

router.post("/category/:id/update", categoryController.categories_update_post);

router.get("/category/:id/delete", categoryController.categories_delete_get);

router.post("/category/:id/delete", categoryController.categories_delete_post);

router.get("/category/:id", categoryController.categories_detail);

router.get("/eliquid/create", eliquidController.eliquid_create_get);

router.post("/eliquid/create", eliquidController.eliquid_create_post);

router.get("/eliquid/:id/delete", eliquidController.eliquid_delete_get);

router.post("/eliquid/:id/delete", eliquidController.eliquid_delete_post);

router.get("/eliquid/:id/update", eliquidController.eliquid_update_get);

router.post("/eliquid/:id/update", eliquidController.eliquid_update_post);

router.get("/eliquid/:id", eliquidController.eliquid_detail);

module.exports = router;
