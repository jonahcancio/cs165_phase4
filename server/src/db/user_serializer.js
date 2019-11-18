const lib = require("./lib");

function listUsers() {
  let query = "SELECT user_id, user_name FROM p_user";
  return lib.executeQuery(query, []);
}

function retrieveUser(user_id) {
  let query = "SELECT user_id, user_name FROM p_user WHERE user_id = ?";
  let values = [user_id];
  return lib.executeQuery(query, values);
}

function createUser(user) {
  let query;
  let values;
  if (user.user_id) {
    query = "INSERT INTO p_user VALUES (?, ?)";
    values = [user.user_id, user.user_name];
  } else {
    query = "INSERT INTO p_user(user_name) VALUES (?)";
    values = [user.user_name];
  }
  resetQuery = "ALTER TABLE p_user AUTO_INCREMENT = 1"
  return lib.executeQueries([resetQuery, query], [[], values]);
}

function updateUser(user_id, user) {
  let query = "UPDATE p_user SET user_id = ?";
  let values = [user_id];
  Object.entries(user).forEach(([key, value]) => {
    if (key === "user_id") {
      return null;
    }
    query += `, ${key} = ?`;
    values.push(value);
  });
  query += " WHERE user_id = ?";
  values.push(user_id);
  return lib.executeQuery(query, values);
}

function deleteUser(user_id) {
  let query = "DELETE FROM p_user WHERE user_id = ?";
  let values = [user_id];
  return lib.executeQuery(query, values);
}

module.exports = {
  retrieve: retrieveUser,
  list: listUsers,
  update: updateUser,
  create: createUser,
  delete: deleteUser
};
