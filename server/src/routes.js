const express = require("express");
const router = express.Router();

const queries = require("./queries");

// Get Pokemon
router.get("/", async (req, res) => {
  let results = await queries.getPokemonBases();
  res.send(results);
});

module.exports = router;
