const extractor = require("../extractors/team_extractor");
const router = require("./user_routes");


async function getAllTeams(request, response) {
  let { user_id } = request.params;
  try {
    let result = await extractor.list(user_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getOneTeam(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await extractor.retrieve(user_id, team_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function postNewTeam(request, response) {
  let { user_id } = request.params;
  let { user_id: _u, ...team_obj } = request.body
  try {
    let result = await extractor.create(user_id, team_obj);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function putChangedTeam(request, response) {
  let { user_id, team_id } = request.params;
  let { user_id: _u, team_id: _t, ...team_obj } = request.body;
  try {
    let result = await extractor.update(user_id, team_id, team_obj);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function deleteOldTeam(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await extractor.delete(user_id, team_id);
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
