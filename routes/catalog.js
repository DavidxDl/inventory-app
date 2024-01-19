const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
const eliquidController = require("../controllers/eliquidController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/photos/",
  filename: function (req, file, cb) {
    // Use the original filename as-is
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: "public/photos/" });

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

router.post(
  "/eliquid/create",
  upload.single("photo"),
  eliquidController.eliquid_create_post,
);

router.get("/eliquid/:id/delete", eliquidController.eliquid_delete_get);

router.post("/eliquid/:id/delete", eliquidController.eliquid_delete_post);

router.get("/eliquid/:id/update", eliquidController.eliquid_update_get);

router.post(
  "/eliquid/:id/update",
  upload.single("photo"),
  eliquidController.eliquid_update_post,
);

router.get("/eliquid/:id", eliquidController.eliquid_detail);

module.exports = router;
