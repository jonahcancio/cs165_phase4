const lib = require("./lib");

function listPokemons(user_id, team_id) {
  return lib.queryTransaction({
    query: `SELECT c.slot_id, b.pokemon_name, c.nickname, b.normal_image,
      b.type_1, b.type_2,
      c.p_level, c.gender, c.happiness, c.is_shiny, c.item_name, c.ability_name, 
      b.hp_base, b.atk_base, b.def_base, b.spa_base, b.spd_base, b.spe_base,
      c.hp_iv, c.atk_iv, c.def_iv, c.spa_iv, c.spd_iv, c.spe_iv,
      c.hp_ev, c.atk_ev,  c.def_ev, c.spa_ev, c.spd_ev, c.spe_ev,
      ts.hp_total, ts.atk_total,  ts.def_total, ts.spa_total, ts.spd_total, ts.spe_total,
      c.nature_name, c.move_1, c.move_2, c.move_3, c.move_4      
      FROM pokemon_bases AS b JOIN pokemon_customs AS c USING(pokemon_name)
      JOIN pokemon_total_stats as ts USING(user_id, team_id, slot_id)
      WHERE c.user_id = ? AND c.team_id = ?`,
    escapes: [user_id, team_id]
  });
}

function retrievePokemon(user_id, team_id, slot_id) {
  return lib.queryTransaction({
    query: `SELECT c.slot_id, b.pokemon_name, c.nickname, b.normal_image,
      b.type_1, b.type_2,
      c.p_level, c.gender, c.happiness, c.is_shiny, c.item_name, c.ability_name, 
      b.hp_base, b.atk_base, b.def_base, b.spa_base, b.spd_base, b.spe_base,
      c.hp_iv, c.atk_iv, c.def_iv, c.spa_iv, c.spd_iv, c.spe_iv,
      c.hp_ev, c.atk_ev,  c.def_ev, c.spa_ev, c.spd_ev, c.spe_ev,
      ts.hp_total, ts.atk_total,  ts.def_total, ts.spa_total, ts.spd_total, ts.spe_total,
      c.nature_name, c.move_1, c.move_2, c.move_3, c.move_4      
      FROM pokemon_bases AS b JOIN pokemon_customs AS c USING(pokemon_name)
      JOIN pokemon_total_stats as ts USING(user_id, team_id, slot_id)
      WHERE c.user_id = ? AND c.team_id = ? AND slot_id = ?`,
    escapes: [user_id, team_id, slot_id]
  });
}

function createPokemon(user_id, team_id, pokemon_obj) {
  let query = `INSERT INTO pokemon_customs SET user_id = ?, team_id = ?, ?`;
  let escapes = [user_id, team_id, pokemon_obj];
  if (!pokemon_obj.slot_id) {
    query += `, slot_id = (SELECT 
      CASE 
        WHEN max(slot_id) IS NOT NULL THEN max(slot_id) + 1
        ELSE 1
      END
      FROM (SELECT slot_id from pokemon_customs WHERE user_id = ? AND team_id = ?) as a)`;
    escapes.push(user_id, team_id);
  }
  return lib.queryTransaction({
    query: query,
    escapes: escapes
  });
}

function updatePokemon(user_id, team_id, slot_id, pokemon_obj) {
  return lib.queryTransaction({
    query:
      "UPDATE pokemon_customs SET slot_id = ?, ? WHERE user_id = ? AND team_id = ? AND slot_id = ?",
    escapes: [slot_id, pokemon_obj, user_id, team_id, slot_id]
  });
}

function deletePokemon(user_id, team_id, slot_id) {
  return lib.queryTransaction({
    query:
      "DELETE FROM pokemon_customs WHERE user_id = ? AND team_id = ? AND slot_id = ?",
    escapes: [user_id, team_id, slot_id]
  });
}

module.exports = {
  retrieve: retrievePokemon,
  list: listPokemons,
  update: updatePokemon,
  create: createPokemon,
  delete: deletePokemon
};
