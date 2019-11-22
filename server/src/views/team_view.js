const serializer = require("../db/team_serializer");
const router = require("./user_view");


async function getAllTeams(request, response) {
  let { user_id } = request.params;
  try {
    let result = await serializer.list(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getOneTeam(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await serializer.retrieve(user_id, team_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function postNewTeam(request, response) {
  let { user_id } = request.params;
  try {
    let result = await serializer.create(user_id, request.body);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function putChangedTeam(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await serializer.update(user_id, team_id, request.body);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function deleteOldTeam(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await serializer.delete(user_id, team_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

router.post("/:user_id(\\d+)/team", postNewTeam);
router.get("/:user_id(\\d+)/team/:team_id(\\d+)", getOneTeam);
router.get("/:user_id(\\d+)/team/", getAllTeams);
router.put("/:user_id(\\d+)/team/:team_id(\\d+)", putChangedTeam);
router.delete("/:user_id(\\d+)/team/:team_id(\\d+)", deleteOldTeam);

module.exports = router;
