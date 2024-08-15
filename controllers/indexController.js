const { getAllCategories } = require("./categoryController");
const { getAllAnimes } = require("../db/animeQueries");

exports.getHomeData = async (req, res) => {
  try {
    const animes = await getAllAnimes();
    console.log("ANIMES:", animes);
    res.render("index", { title: "Home", animes: animes });
  } catch (error) {
    console.log(error);
  }
};
