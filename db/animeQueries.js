const pool = require("./pool");

const fetchAllAnimes = async () => {
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
    throw error;
  }
};

const fetchSingleAnime = async (animeId) => {
  try {
    const { rows } = await pool.query(
      `SELECT animes.*, 
        STRING_AGG(categories.name, ', ') AS categories
        FROM animes
        JOIN anime_categories ON animes.id = anime_categories.anime_id
        JOIN categories ON categories.id = anime_categories.category_id
        WHERE animes.id = $1
        GROUP BY animes.id;`,
      [animeId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const createAnime = async (
  title,
  description,
  release_date,
  rating,
  categories
) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO animes (title, description, release_date, rating) 
      VALUES ($1, $2, $3, $4) RETURNING *;`,
      [title, description, release_date, rating]
    );
    const categoryValues = categories
      .map((categoryId) => `(${rows[0].id}, ${categoryId})`)
      .join(", ");
    await pool.query(`INSERT INTO anime_categories (anime_id, category_id)
      VALUES ${categoryValues}; `);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { fetchAllAnimes, fetchSingleAnime, createAnime };
