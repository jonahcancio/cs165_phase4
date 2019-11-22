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
  return lib.queryTransaction([
    {
      query: "ALTER TABLE p_user AUTO_INCREMENT = 1",
      escapes: []
    },
    {
      query: user_obj.user_id? "INSERT INTO p_user VALUES (?, ?)" : "INSERT INTO p_user(user_name) VALUES (?)",
      escapes: user_obj.user_id? [user_obj.user_id, user_obj.user_name] : [user_obj.user_name]
    }
  ]);
}

function updateUser(user_id, user_obj) {
  let query = "UPDATE p_user SET user_id = ?";
  let escapes = [user_id];
  if (user_obj.user_name) {
    query += ", user_name = ?"
    escapes.push(user_obj.user_name)
  }
  query += " WHERE user_id = ?";
  escapes.push(user_id);
  return lib.queryTransaction({
    query: query,
    escapes: escapes
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
