const extractor = require("../extractors/readonly_extractor");
const router = require("express").Router();


async function getAllPokemons(request, response) {
  try {
    let result = await extractor.listPokemons();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getAllTypes(request, response) {
  try {
    let result = await extractor.listTypes();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getAllNatures(request, response) {
  try {
    let result = await extractor.listNatures();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getAllItems(request, response) {
  try {
    let result = await extractor.listItems();
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getAllAbilities(request, response) {
  let { pokemon_name } = request.params;
  try {
    let result = await extractor.listAbilities(pokemon_name);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}

async function getAllMoves(request, response) {
  let { pokemon_name } = request.params;
  try {
    let result = await extractor.listMoves(pokemon_name);
    response.send(result);
  } catch (error) {
    response.send(error);
  }
}



router.get("/pokemon", getAllPokemons);
router.get("/type", getAllTypes);
router.get("/nature", getAllNatures);
router.get("/item", getAllItems);
router.get("/ability/:pokemon_name", getAllAbilities);
router.get("/move/:pokemon_name", getAllMoves);


module.exports = router;
