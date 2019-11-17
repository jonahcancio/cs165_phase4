const mysql = require("mysql2");
const config = require("./config")

var conn = mysql.createConnection(config.db);

const getPokemonBases = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM pokemon_total_stats", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  getPokemonBases: getPokemonBases
};
