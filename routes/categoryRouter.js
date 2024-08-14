const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  addCategoryGet,
  addCategoryPost,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/new", addCategoryGet);
router.post("/new", addCategoryPost);
router.post("/:id/edit", updateCategory);
router.post("/:id/delete", deleteCategory);

module.exports = router;
