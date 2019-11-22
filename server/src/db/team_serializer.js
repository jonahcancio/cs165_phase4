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
  let select = team_obj.team_id
    ? "SELECT ?, ?, ? from user_team where user_id = ?"
    : "SELECT ?, max(team_id) + 1, ? from user_team where user_id = ?";
  let escapes = team_obj.team_id
    ? [user_id, team_obj.team_id, team_obj.team_name, user_id]
    : [user_id, team_obj.team_name, user_id];
  return lib.queryTransaction({
    query: `INSERT INTO user_team (${select})`,
    escapes: escapes
  });
}

function updateTeam(user_id, team_id, team_obj) {
  let query = "UPDATE user_team SET user_id = ?, team_id = ?";
  let escapes = [user_id, team_id];
  if (team_obj.team_name) {
    query += ", team_name = ?"
    escapes.push(team_obj.team_name)
  }
  query += " WHERE user_id = ? AND team_id = ?";
  escapes.push(user_id, team_id);
  return lib.queryTransaction({
    query: query,
    escapes: escapes
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
