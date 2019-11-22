const mysql = require("mysql2");
const config = require("../config");

var conn = mysql.createConnection(config.db);

function appendPromise(promiseChain, obj) {
  return promiseChain.then((resultsList) => {
    return new Promise((resolve, reject) => {
      conn.query(obj.query, obj.escapes, (error, results) => {
        if (error) {
          reject("Query failed -- " + error);
        }
        resultsList.push(results);
        resolve(resultsList);
      });
    });
  });
}

function queryTransaction(queryList) {
  console.log(JSON.stringify(queryList))
  let promiseChain = new Promise((resolve, reject) => {
    conn.beginTransaction(error => {
      if (error) {
        reject("Begin Transaction failed -- " + error);
      }
      resolve([]);
    });
  });

  // if single query
  if (!Array.isArray(queryList)) {
    promiseChain = appendPromise(promiseChain, queryList)
  }
  // if list of queries 
  else {
    queryList.forEach(obj => {
      promiseChain = appendPromise(promiseChain, obj);
    })
  }

  return promiseChain
    .then((resultsList) => {
      conn.commit();
      console.log("Transaction success: ", JSON.stringify(queryList));
      return resultsList;
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
  queryTransaction: queryTransaction,
  log: log
};
