const extractor = require("../extractors/pokemon_extractor");
const router = require("./team_routes");


async function getAllPokemons(request, response) {
  let { user_id, team_id } = request.params;
  try {
    let result = await extractor.list(user_id, team_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getOnePokemon(request, response) {
  let { user_id, team_id, slot_id } = request.params;
  try {
    let result = await extractor.retrieve(user_id, team_id, slot_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function postNewPokemon(request, response) {
  let { user_id, team_id } = request.params;
  let { user_id: _u, team_id: _t, ...pokemon_obj } = request.body
  try {
    let result = await extractor.create(user_id, team_id, pokemon_obj);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function putChangedPokemon(request, response) {
  let { user_id, team_id, slot_id } = request.params;
  let { user_id: _u, team_id: _t, slot_id: _s, ...pokemon_obj } = request.body;
  try {
    let result = await extractor.update(user_id, team_id, slot_id, pokemon_obj);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}


async function deleteOldPokemon(request, response) {
  let { user_id, team_id, slot_id } = request.params;
  try {
    let result = await extractor.delete(user_id, team_id, slot_id);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

router.post("/:user_id(\\d+)/team/:team_id(\\d+)/pokemon", postNewPokemon);
router.get("/:user_id(\\d+)/team/:team_id(\\d+)/pokemon/:slot_id(\\d+)", getOnePokemon);
router.get("/:user_id(\\d+)/team/:team_id(\\d+)/pokemon", getAllPokemons);
router.put("/:user_id(\\d+)/team/:team_id(\\d+)/pokemon/:slot_id(\\d+)", putChangedPokemon);
router.delete("/:user_id(\\d+)/team/:team_id(\\d+)/pokemon/:slot_id(\\d+)", deleteOldPokemon);

module.exports = router;
