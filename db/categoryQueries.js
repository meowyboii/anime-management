const pool = require("./pool");

const fetchAllCategories = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (name) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *;`,
      [name]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { fetchAllCategories, createCategory };
