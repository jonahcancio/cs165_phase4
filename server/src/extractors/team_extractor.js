const lib = require("./lib");

function listTeams(user_id) {
  return lib.queryTransaction({
    query: "SELECT team_id, team_name FROM user_team WHERE user_id = ?",
    escapes: [user_id]
  });
}

function retrieveTeam(user_id, team_id) {
  return lib.queryTransaction({
    query:
      "SELECT team_id, team_name FROM user_team WHERE user_id = ? AND team_id = ?",
    escapes: [user_id, team_id]
  });
}

function createTeam(user_id, team_obj) {
  let query = `INSERT INTO user_team SET user_id = ?, ?`;
  let escapes = [user_id, team_obj];
  if (!team_obj.team_id) {
    query +=
      `, team_id = 
      (SELECT max(team_id) + 1 FROM (SELECT team_id from user_team WHERE user_id = ?) as a
      )`;
    escapes.push(user_id);
  }
  return lib.queryTransaction({
    query: query,
    escapes: escapes
  });
}

function updateTeam(user_id, team_id, team_obj) {
  return lib.queryTransaction({
    query: "UPDATE user_team SET team_id = ?, ? WHERE user_id = ? AND team_id = ?",
    escapes: [team_id, team_obj, user_id, team_id]
  });
}

function deleteTeam(user_id, team_id) {
  return lib.queryTransaction({
    query: "DELETE FROM user_team WHERE user_id = ? AND team_id = ?",
    escapes: [user_id, team_id]
  });
}

module.exports = {
  retrieve: retrieveTeam,
  list: listTeams,
  update: updateTeam,
  create: createTeam,
  delete: deleteTeam
};
