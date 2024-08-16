const { fetchAllCategories } = require("../db/categoryQueries");
const { fetchAllAnimes } = require("../db/animeQueries");

exports.getHomeData = async (req, res) => {
  try {
    const animes = await fetchAllAnimes();
    const categories = await fetchAllCategories();
    res.render("index", {
      title: "Home",
      animes: animes,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
  }
};
