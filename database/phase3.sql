-- creating new user
INSERT INTO p_user VALUES (1, 'Ashe Ketchum')

-- creating new pokemon team
INSERT INTO user_team VALUES (1, 2, 'Alola Championship')

-- adding new pokemon to a team
INSERT INTO pokemon_customs VALUES
(user_id, team_id, team_slot, 'Pikachu', 'Renolds', 100, 'F', 255, 0, 'Sitrus Berry', 'Static',
 31, 31, 31, 31, 31, 31, 176, 252, 0, 0, 0, 80, 
 'Jolly', 'Volt Tackle', 'Iron Tail', 'Thunderbolt', 'Knock Off')

 -- reading the pokemon in a predefined team
 SELECT pokemon_name, c.nickname, b.normal_image, b.shiny_image, b.type1, b.type2, c.p_level 
  FROM pokemon_bases AS b JOIN pokemon_customs AS c USING(pokemon_name)
  WHERE c.user_id = 1 AND c.team_id = 2;
 
 -- getting the in-depth stats of a pokemon in a team
 SELECT pokemon_name,
  c.nickname, c.p_level, c.gender, c.happiness, c.is_shiny, c.item_name, c.ability_name, 
  c.hp_iv, c.atk_iv, c.def_iv, c.spa_iv, c.spd_iv, c.spe_iv,
  c.hp_ev, c.atk_ev,  c.def_ev, c.spa_ev, c.spd_ev, c.spe_ev,
  c.nature_name, c.move1, c.move2, c.move3, c.move4,
  b.normal_image, b.shiny_image, b.type1, b.type2
  FROM pokemon_bases AS b JOIN pokemon_customs AS c USING(pokemon_name)
  WHERE c.user_id = 1 AND c.team_id = 2 AND c.team_slot = 1;

 -- getting list of possible items
SELECT * FROM item;

-- getting list of possible natures
SELECT * FROM nature;

 -- getting list of possible abilities
SELECT a.ability_name, a.ability_description 
  FROM ability AS a JOIN pokemon_abilitysets AS pa USING(ability_name)
  WHERE pa.pokemon_name = 'Pikachu';

 -- getting list of possible moves for pokemon
 SELECT m.move_name, m.move_type, m.move_category, m.move_power, m.move_accuracy, m.move_pp, m.move_effect
  FROM p_move AS m JOIN pokemon_movesets AS pm USING(move_name)
  WHERE pm.pokemon_name = 'Pikachu'


-- updating username
UPDATE p_user SET user_name = 'Gou' WHERE user_id = 1;

-- updating team names
UPDATE user_team SET team_name = 'Galar Set'
  WHERE user_id = 1 AND team_id = 1;

-- updating pokemon and its stats/moves in a team
UPDATE pokemon_customs SET
  pokemon_name = 'Greninja',
  p_level = 100,
  move1 = 'Water Shuriken',
  move2 = 'Dark Pulse',
  move3 = 'Cut',
  move4 = 'Hydro Pump',
  ability_name = 'Battle Bond',
  nature_name = 'Serious'
  WHERE user_id = 1 AND team_id = 1 AND team_slot = 2;

-- deleting a user
DELETE from p_user WHERE user_id = 2;

-- deleting a team
DELETE from user_team 
  WHERE user_id = 1 AND team_id = 2;

-- deleting a pokemon
DELETE FROM pokemon_customs
  WHERE user_id = 1 AND team_id = 1 AND team_slot = 3;