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
    if (!Array.isArray(categories)) {
      categories = [categories];
    }
    const { rows } = await pool.query(
      `INSERT INTO animes (title, description, release_date, rating) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;`,
      [title, description, release_date, rating]
    );
    const categoryValues = categories
      .map((_, index) => `($1, $${index + 2})`)
      .join(", ");

    const values = [rows[0].id, ...categories];

    const addCategoriesQuery = `INSERT INTO anime_categories (anime_id, category_id) 
                                VALUES ${categoryValues}; `;
    await pool.query(addCategoriesQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const updateAnimeById = async (
  title,
  description,
  release_date,
  rating,
  categories,
  animeId
) => {
  try {
    if (!Array.isArray(categories)) {
      categories = [categories];
    }
    const { rows } = await pool.query(
      `UPDATE animes
      SET title = $1, description = $2, release_date = $3, rating = $4
      WHERE id = $5
      RETURNING *;`,
      [title, description, release_date, rating, animeId]
    );
    await pool.query(
      `DELETE FROM anime_categories
      WHERE anime_id = $1;`,
      [animeId]
    );
    const categoryValues = categories
      .map((_, index) => `($1, $${index + 2})`)
      .join(", ");
    const values = [animeId, ...categories];
    const addCategoriesQuery = `INSERT INTO anime_categories (anime_id, category_id) 
                                VALUES ${categoryValues}; `;
    await pool.query(addCategoriesQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteAnimeById = async (animeId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM animes
      WHERE id = $1 RETURNING *`,
      [animeId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllAnimes,
  fetchSingleAnime,
  createAnime,
  updateAnimeById,
  deleteAnimeById,
};
