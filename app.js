const express = require("express");
const path = require("node:path");
const app = express();
const animeRouter = require("./routes/animeRouter");
const categoryRouter = require("./routes/categoryRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", (req, res) => res.send("Home"));
app.use("/anime", animeRouter);
app.use("/category", categoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
