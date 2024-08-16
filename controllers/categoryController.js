const {
  fetchAllCategories,
  fetchSingleCategory,
} = require("../db/categoryQueries");

const getAllCategories = async (req, res) => {
  try {
    const categories = await fetchAllCategories();
    res.render("category/category", {
      title: "Category",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};
const addCategoryGet = (req, res) => {
  res.send("Add Category Form");
};
const addCategoryPost = (req, res) => {
  res.send("Add New Category");
};
const updateCategory = (req, res) => {
  res.send("Update Category");
};
const deleteCategory = (req, res) => {
  res.send("Delete Category");
};

module.exports = {
  getAllCategories,
  addCategoryGet,
  addCategoryPost,
  updateCategory,
  deleteCategory,
};
