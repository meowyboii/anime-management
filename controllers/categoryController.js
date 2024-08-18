const {
  fetchAllCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
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
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await updateCategoryById(id, name);
    if (updatedCategory) {
      res.redirect("/category");
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await deleteCategoryById(id);
    if (deletedCategory) {
      res.redirect("/category");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
  addCategoryGet,
  addCategoryPost,
  updateCategory,
  deleteCategory,
};
