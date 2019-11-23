const lib = require("./lib");

function listUsers() {
  return lib.queryTransaction({
    query: "SELECT user_id, user_name FROM p_user",
    escapes: []
  });
}

function retrieveUser(user_id) {
  return lib.queryTransaction({
    query: "SELECT user_id, user_name FROM p_user WHERE user_id = ?",
    escapes: [user_id]
  });
}

function createUser(user_obj) {
  let query = `INSERT INTO p_user SET ?`;
  let escapes = [user_obj];
  if (!user_obj.user_id) {
    query +=
      `, user_id = 
      (SELECT max(user_id) + 1 FROM (SELECT user_id from p_user) as a
      )`;
  }
  return lib.queryTransaction({
    query: query,
    escapes: escapes
  });
}

function updateUser(user_id, user_obj) {
  return lib.queryTransaction({
    query: "UPDATE p_user SET user_id = ?, ? WHERE user_id = ?",
    escapes: [user_id, user_obj, user_id]
  });
}

function deleteUser(user_id) {
  return lib.queryTransaction({
    query: "DELETE FROM p_user WHERE user_id = ?",
    escapes: [user_id]
  });
}

module.exports = {
  retrieve: retrieveUser,
  list: listUsers,
  update: updateUser,
  create: createUser,
  delete: deleteUser
};
