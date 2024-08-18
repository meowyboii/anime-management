const { fetchAllCategories, createCategory } = require("../db/categoryQueries");

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
  try {
    res.render("category/add-category", { title: "Add New Category" });
  } catch (error) {
    console.log(error);
  }
};
const addCategoryPost = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await createCategory(name);
    if (category) {
      res.redirect("/category");
    }
  } catch (error) {
    console.log(error);
  }

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
