const { fetchAllAnimes, fetchSingleAnime } = require("../db/animeQueries");

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
const addAnimeGet = (req, res) => {
  res.send("Add Anime Form");
};
const addAnimePost = (req, res) => {
  res.send("Add New Anime");
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
