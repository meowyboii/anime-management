const getAllCategories = (req, res) => {
  res.send("All Categories");
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
