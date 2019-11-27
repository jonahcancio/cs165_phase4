const lib = require("./lib");

function listPokemonChoices() {
  return lib.queryTransaction({
    query: `SELECT pokemon_name, type_1, type_2, normal_image,
    hp_base, atk_base, def_base, spa_base, spd_base, spe_base
    FROM pokemon_bases`,
    escapes: []
  });
}

function listPokemonStats(pokemon_name) {
  return lib.queryTransaction({
    query: `SELECT pokemon_name, type_1, type_2, normal_image,
    hp_base, atk_base, def_base, spa_base, spd_base, spe_base
    FROM pokemon_bases WHERE pokemon_name = ?`,
    escapes: [pokemon_name]
  });
}

function listItemChoices() {
  return lib.queryTransaction({
    query: `SELECT item_name, item_description FROM item`,
    escapes: []
  });
}

function listAbilityChoices(pokemon_name) {
  return lib.queryTransaction({
    query: `SELECT a.ability_name, a.ability_description FROM 
      (ability AS a) JOIN (pokemon_abilitysets AS pa) USING(ability_name)
      WHERE pa.pokemon_name = ?`,
    escapes: [pokemon_name]
  });
}

function listMoveChoices(pokemon_name) {
  return lib.queryTransaction({
    query: `SELECT m.move_name, m.move_type, m.move_category, m.move_power,
    m.move_accuracy, m.move_pp, m.move_effect FROM 
    (p_move AS m) JOIN (pokemon_movesets AS pm) USING(move_name)
    WHERE pm.pokemon_name = ?`,
    escapes: [pokemon_name]
  });
}

function listTypeColors() {
  return lib.queryTransaction({
    query: `SELECT type_name, type_color FROM p_type`,
    escapes: []
  });
}

function listNatureChoices() {
  return lib.queryTransaction({
    query: `SELECT nature_name, atk_mult, def_mult, spa_mult, spd_mult, spe_mult FROM nature`,
    escapes: []
  });
}


module.exports = {
  listPokemons: listPokemonChoices,
  listStats: listPokemonStats,
  listItems: listItemChoices,
  listNatures: listNatureChoices,
  listTypes: listTypeColors,
  listAbilities: listAbilityChoices,
  listMoves: listMoveChoices
};
