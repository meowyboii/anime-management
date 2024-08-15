const pool = require("./pool");

const getAllAnimes = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT animes.* AS anime_title, 
        STRING_AGG(categories.name, ', ') AS categories
        FROM animes
        JOIN anime_categories ON animes.id = anime_categories.anime_id
        JOIN categories ON categories.id = anime_categories.category_id
        GROUP BY animes.id
        ORDER BY animes.id ASC;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllAnimes };
