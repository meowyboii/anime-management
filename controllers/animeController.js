const getAllAnimes = (req, res) => {
  res.send("All Animes");
};
const getSingleAnime = (req, res) => {
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
