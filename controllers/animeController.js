const {
  fetchAllAnimes,
  fetchSingleAnime,
  createAnime,
} = require("../db/animeQueries");

const { fetchAllCategories } = require("../db/categoryQueries");

const getAllAnimes = async (req, res) => {
  try {
    const animes = await fetchAllAnimes();
    res.render("anime/anime", { title: "Anime", animes: animes });
  } catch (error) {
    console.log(error);
  }
};
const getSingleAnime = async (req, res) => {
  const { id } = req.params;
  const anime = await fetchSingleAnime(id);
  res.send("Single Anime");
};
const addAnimeGet = async (req, res) => {
  try {
    const categories = await fetchAllCategories();
    res.render("anime/add-anime", {
      title: "Add New Anime",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};
const addAnimePost = async (req, res) => {
  const { title, description, release_date, rating, categories } = req.body;
  try {
    const anime = await createAnime(
      title,
      description,
      release_date,
      rating,
      categories
    );
    console.log(anime);
    res.redirect("/anime");
  } catch (error) {
    console.log(error);
  }
};
const updateAnime = (req, res) => {
  res.send("Update Anime");
};
const deleteAnime = (req, res) => {
  res.send("Delete Anime");
};

module.exports = {
  getAllAnimes,
  getSingleAnime,
  addAnimeGet,
  addAnimePost,
  updateAnime,
  deleteAnime,
};
