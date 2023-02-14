const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(bodyParser.json());
app.get("/", async (req, res) => {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.coingecko.com/en/coins/froggies-token",
  });
  const $ = cheerio.load(axiosResponse.data);
  const list = $(
    "span[class='tw-text-gray-900 dark:tw-text-white tw-font-medium tw-mr-1']"
  );

  res.json({
    circulatingSupply: parseInt(list[0].children[0].data.replace(/,/g, "")),
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
