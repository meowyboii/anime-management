const express = require("express");
const router = express.Router();
const {
  getAllAnimes,
  getSingleAnime,
  addAnimeGet,
  addAnimePost,
  updateAnime,
  deleteAnime,
} = require("../controllers/animeController");

router.get("/", getAllAnimes);
router.get("/new", addAnimeGet);
router.get("/:id", getSingleAnime);
router.post("/new", addAnimePost);
router.post("/:id/edit", updateAnime);
router.post("/:id/delete", deleteAnime);

module.exports = router;
