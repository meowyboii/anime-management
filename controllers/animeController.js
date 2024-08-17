const {
  fetchAllAnimes,
  fetchSingleAnime,
  createAnime,
  updateAnimeById,
  deleteAnimeById,
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
  try {
    const anime = await fetchSingleAnime(id);
    const categories = await fetchAllCategories();
    res.render("anime/single-anime", {
      title: anime.title,
      anime: anime,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
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
    if (anime) {
      console.log(anime);
      res.redirect("/anime");
    }
  } catch (error) {
    console.log(error);
  }
};
const updateAnime = async (req, res) => {
  const { id } = req.params;
  const { title, description, release_date, rating, categories } = req.body;
  const updatedAnime = await updateAnimeById(
    title,
    description,
    release_date,
    rating,
    categories,
    id
  );
  if (updatedAnime) {
    console.log(updatedAnime);
    res.redirect(`/anime/${id}`);
  }
};
const deleteAnime = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnime = await deleteAnimeById(id);
    if (deletedAnime) {
      res.redirect("/anime");
    } else {
      res.status(404).send("Anime not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAnimes,
  getSingleAnime,
  addAnimeGet,
  addAnimePost,
  updateAnime,
  deleteAnime,
};
