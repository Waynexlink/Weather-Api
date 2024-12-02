//intialization and requiring
const express = require("express");
const needle = require("needle");
const url = require("url");
const apicache = require("apicache");
const router = express.Router();
require("dotenv").config();

//intialise cache
let cache = apicache.middleware;

//.env stuffs
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });
    const apiRES = await needle("get", `${API_BASE_URL}?${params}`);
    console.log(apiRES.body);
    const data = apiRES.body;
    res.status(500).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
