const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherData = require("../utils/weatherDataFile");
const port = process.env.PORT || 8000;

const publicPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.status(400).send("Address query parameter is required"); // Send a clear error message
  }

  const apiData = await weatherData(req.query.address);
  res.send(apiData);
});

app.get("*", (req, res) => {
  res.render("404", { title: "Page not found" });
});

app.listen(port, () => {
  console.log("Server has been started on port " + port);
});
