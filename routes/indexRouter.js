const express = require("express");
const router = express.Router();

const { getHomeData } = require("../controllers/indexController");

router.get("/", getHomeData);

module.exports = router;
