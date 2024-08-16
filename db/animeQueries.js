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
    console.log(error);
    throw error;
  }
};

const fetchSingleAnime = async (animeId) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM animes WHERE id = $1;`, [
      animeId,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchAllAnimes, fetchSingleAnime };
