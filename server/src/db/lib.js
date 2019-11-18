const mysql = require("mysql2");
const config = require("../config");

var conn = mysql.createConnection(config.db);

function executeQuery(queryString, valuesArray) {
  return new Promise((resolve, reject) => {
    conn.beginTransaction(error => {
      if (error) {
        reject("Begin Transaction failed -- " + error);
      }
      resolve();
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        conn.query(queryString, valuesArray, (error, results) => {
          if (error) {
            reject("Query failed -- " + error);
          }
          resolve(results);
        });
      });
    })
    .then(results => {
      conn.commit();
      console.log("Single query transaction success: " + queryString);
      console.log(valuesArray);
      return results;
    })
    .catch(error => {
      conn.rollback();
      throw error;
    });
}

function executeQueries(queryArray, nestedValuesArray) {
  let promiseChain = new Promise((resolve, reject) => {
    conn.beginTransaction(error => {
      if (error) {
        reject("Begin Transaction failed -- " + error);
      }
      resolve([]);
    });
  });
  
  for (let i = 0; i < queryArray.length; i++) {
    promiseChain = promiseChain.then((resultsArray) => {
      return new Promise((resolve, reject) => {
        conn.query(queryArray[i], nestedValuesArray[i], (error, results) => {
          if (error) {
            reject("Query failed -- " + error);
          }
          resultsArray.push(results);
          resolve(resultsArray);
        });
      });
    });
  }

  return promiseChain
    .then((resultsArray) => {
      conn.commit();
      console.log("Multiple query transaction success: " + queryArray);
      return resultsArray;
    })
    .catch(error => {
      conn.rollback();
      throw error;
    });
}

var oldLog = console.log;
var log = function() {
  oldLog.apply(console, arguments);
  // Print the stack trace
  console.trace();
};

module.exports = {
  executeQuery: executeQuery,
  executeQueries: executeQueries,
  log: log
};
