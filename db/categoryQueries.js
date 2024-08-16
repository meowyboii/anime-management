const pool = require("./pool");

const fetchAllCategories = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchSingleCategory = async (categoryName) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM categories WHERE name = $1;`,
      [categoryName]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchAllCategories, fetchSingleCategory };
