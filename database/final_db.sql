
-- CS 165 Phase 2 SQL Dump
-- Jonathan Jandel R. Cancio
-- 2015-08058
-- Form: Pokemon Showdown Teambuilder
-- Database Engine: MySQL


-- database creation
CREATE DATABASE IF NOT EXISTS cancio;
USE cancio;

START TRANSACTION;

-- prefixed with p_ since USER is reserved
CREATE TABLE p_user
(
  user_id   INT AUTO_INCREMENT,
  user_name VARCHAR(18),
  PRIMARY KEY(user_id)
);
INSERT INTO p_user VALUES
(1, 'Ashe Ketchum'),
(2, 'Serena'),
(3, 'Masashiro Sakurai')
;

-- teams of every user
CREATE TABLE user_team
(
  user_id   INT,
  team_id   INT,
  team_name VARCHAR(37),
  PRIMARY KEY(user_id, team_id),
  FOREIGN KEY(user_id) REFERENCES p_user(user_id) ON DELETE CASCADE
);
INSERT INTO user_team VALUES
(1, 1, 'Champion Team'),
(2, 1, 'Performance'),
(3, 1, 'Smash Roster')
;

-- new table created (originally not in phase 1) to enumerate pokemon types
-- prefixed with p_ since TYPE is reserved
CREATE TABLE p_type
(
  type_name VARCHAR(10),
  type_color VARCHAR(7),
  PRIMARY KEY (type_name)
);
INSERT INTO p_type VALUES
('Normal', '#A8A878'),
('Fighting', '#C03028'),
('Flying', '#A890F0'),
('Poison', '#A040A0'),
('Ground', '#E0C068'),
('Rock', '#B8A038'),
('Bug', '#A8B820'),
('Ghost', '#705898'),
('Steel', '#B8B8D0'),
('Fire', '#F08030'),
('Water', '#6890F0'),
('Grass', '#78C850'),
('Electric', '#F8D030'),
('Psychic', '#F85888'),
('Ice', '#98D8D8'),
('Dragon', '#7038F8'),
('Dark', '#705848'),
('Fairy', '#EE99AC');

-- Pokemon nature/personality have multiplier effects on certain stats
-- Instead of having 2 columns indicating which stat was buffed/nerf as in phase 1,
-- columns for each stat multiplier were used; makes stat computation easier
CREATE TABLE nature
(
  nature_name VARCHAR(10),
  attack_mult DECIMAL(3,2),
  defense_mult DECIMAL(3,2),
  spatk_mult DECIMAL(3,2),
  spdef_mult DECIMAL(3,2),
  speed_mult DECIMAL(3,2),
  PRIMARY KEY(nature_name)
);
INSERT INTO nature VALUES
('Hardy', 1, 1, 1, 1, 1),
('Lonely', 1.1, 0.9, 1, 1, 1),
('Adamant', 1.1, 1, 0.9, 1, 1),
('Naughty', 1.1, 1, 1, 0.9, 1),
('Brave', 1.1, 1, 1, 1, 0.9),
('Bold', 0.9, 1.1, 1, 1, 1),
('Docile', 1, 1, 1, 1, 1),
('Impish', 1, 1.1, 0.9, 1, 1),
('Lax', 1, 1.1, 1, 0.9, 1),
('Relaxed', 1, 1.1, 1, 1, 0.9),
('Modest', 0.9, 1, 1.1, 1, 1),
('Mild', 1, 0.9, 1.1, 1, 1),
('Bashful', 1, 1, 1, 1, 1),
('Rash', 1, 1, 1.1, 0.9, 1),
('Quiet', 1, 1, 1.1, 1, 0.9),
('Calm', 0.9, 1, 1, 1.1, 1),
('Gentle', 1, 0.9, 1, 1.1, 1),
('Careful', 1, 1, 0.9, 1.1, 1),
('Quirky', 1, 1, 1, 1, 1),
('Sassy', 1, 1, 1, 1.1, 0.9),
('Timid', 0.9, 1, 1, 1, 1.1),
('Hasty', 1, 0.9, 1, 1, 1.1),
('Jolly', 1, 1, 0.9, 1, 1.1),
('Naive', 1, 1, 1, 0.9, 1.1),
('Serious', 1, 1, 1, 1, 1);

-- Possible items a pokemon can hold
CREATE TABLE item
(
  item_name VARCHAR(30),
  item_description VARCHAR(150),
  PRIMARY KEY(item_name)
);
INSERT INTO item VALUES
('Sitrus Berry', 'Restores 1/4 max HP when at 1/2 max HP or less. Single use.'),
('Wacan Berry', 'Halves damage taken from a supereffective Electric-type attack. Single use.'),
('Rindo Berry', 'Halves damage taken from a supereffective Grass-type attack. Single use.'),
('Occa Berry', 'Halves damage taken from a supereffective Fire-type attack. Single use.'),
('Passho Berry', 'Halves damage taken from a supereffective Water-type attack. Single use.'),
('Focus Sash', 'If holder''s HP is full, will survive a  attack that would KO it with 1 HP. Single use.'),
('Life Orb', 'Holder''s attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.'),
('Eviolite', 'If holder''s species can evolve, its Defense and Sp. Def are 1.5x.'),
('Lax Incense', 'The accuracy of attacks against the holder is 0.9x'),
('Leftovers', 'At the end of every turn, holder restores 1/16 of its max HP.');
;

-- innate values associated with each pokemon
CREATE TABLE pokemon_bases
(
  pokemon_name VARCHAR(30),
  type_1 VARCHAR(10),
  type_2 VARCHAR(10),
  hp_base INT UNSIGNED,
  attack_base INT UNSIGNED,
  defense_base INT UNSIGNED,
  spatk_base INT UNSIGNED,
  spdef_base INT UNSIGNED,
  speed_base INT UNSIGNED,
  PRIMARY KEY(pokemon_name),
  FOREIGN KEY (type_1) REFERENCES p_type(type_name),
  FOREIGN KEY (type_2) REFERENCES p_type(type_name)
);
INSERT INTO pokemon_bases VALUES
('Pikachu', 'Electric', NULL, 35, 55, 40, 50, 50, 90),
('Squirtle', 'Water', NULL, 44, 48, 65, 50, 64, 43),
('Ivysaur', 'Grass', 'Poison', 60, 62, 63, 80, 80, 60),
('Charizard', 'Fire', 'Flying', 78, 84, 78, 109, 85, 100)
;

-- Special passive abilities; Pokemon usually choose between 1-3 possible ones
CREATE TABLE ability
(
  ability_name VARCHAR(30),
  ability_description VARCHAR(150),
  PRIMARY KEY(ability_name)
);
INSERT INTO ability VALUES
('Static', '30% chance a Pokemon making contact with this Pokemon will be paralyzed.'),
('Lightning Rod', 'This Pokemon Draws Electric-moves to itself to raise Sp. Atk by 1; Electric immunity.'),
('Torrent', 'At 1/3 or less of its max HP, this Pokemon''s attacking stat is 1.5x with Water attacks.'),
('Rain Dish', 'If Rain Dance is active, this Pokemon heals 1/16 of its max HP each turn.'),
('Overgrow', 'At 1/3 or less of its max HP, this Pokemon''s attacking stat is 1.5x with Grass attacks.'),
('Chlorophyll', 'If Sunny Day is active, this Pokemon''s Speed is doubled.'),
('Blaze', 'At 1/3 or less of its max HP, this Pokemon''s attacking stat is 1.5x with Fire attacks.'),
('Solar Power', 'If Sunny Day is active, this Pokemon''s Sp.Atk is 1.5x; loses 1/8 max HP per turn.')
;

-- limits the choice of abilities each pokemon can have
CREATE TABLE pokemon_abilitysets 
(
  pokemon_name VARCHAR(30),
  ability_name VARCHAR(30),
  PRIMARY KEY(pokemon_name, ability_name),
  FOREIGN KEY (pokemon_name) REFERENCES pokemon_bases(pokemon_name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (ability_name) REFERENCES ability(ability_name) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO pokemon_abilitysets VALUES
('Pikachu', 'Static'),
('Pikachu', 'Lightning Rod'),
('Squirtle', 'Torrent'), 
('Squirtle', 'Rain Dish'),
('Ivysaur', 'Chlorophyll'),
('Ivysaur', 'Overgrow'),
('Charizard', 'Blaze'),
('Charizard', 'Solar Power')
;

-- list down the possible moves pokemon can learn/perform
-- prefixed with p_ since MOVE is reserved
CREATE TABLE p_move (
  move_name VARCHAR(30),
  move_type VARCHAR(10),
  move_category VARCHAR(10),
  move_power INT UNSIGNED,
  move_accuracy INT UNSIGNED,
  move_pp INT UNSIGNED,
  move_effect VARCHAR(150),
  PRIMARY KEY(move_name),
  FOREIGN KEY(move_type) REFERENCES p_type(type_name)
);
INSERT INTO p_move VALUES 
('Iron Tail', 'Steel', 'Physical', 100, 75, 24, '30% chance to lower the target''s Defense by 1.'),
('Volt Tackle', 'Electric', 'Physical', 120, 100, 24, 'Has 33% recoil. 10% chance to paralyze target.'),
('Thunderbolt', 'Electric', 'Special', 90, 100, 24, '10% chance to paralyze the target.'),
('Thunder', 'Electric', 'Special', 110, 70, 16, '30% chance to paralyze. Can''t miss in rain.'),
('Quick Attack', 'Normal', 'Physical', 40, 100, 48, 'Usually goes first.'),
('Skull Bash', 'Normal', 'Physical', 130, 100, 16, 'Raises user''s Defense by 1 on turn 1. Hits turn 2.'),
('Water Gun', 'Water', 'Special', 40, 100, 40, 'No additional effect.'),
('Withdraw', 'Water', 'Status', NULL, NULL, 64, 'Raises the user''s Defense by 1.'),
('Waterfall', 'Water', 'Physical', 80, 100, 24, '20% chance to flinch the target.'),
('Hydro Pump', 'Water', 'Special', 110, 80, 8, 'No additional effect.'),
('Return', 'Normal', 'Physical', NULL, 100, 32, 'Max 102 power at maximum Happiness.'),
('Ice Beam', 'Ice', 'Special', 90, 100, 16, '10% chance to freeze the target.'),
('Bullet Seed', 'Grass', 'Physical', 25, 100, 48, 'Hits 2-5 times in one turn.'),
('Razor Leaf', 'Grass', 'Physical', 55, 100, 32, 'Raises the user''s Attack by 1 if hit during use.'),
('Power Whip', 'Grass', 'Physical', 120, 85, 16, 'No additional effect.'),
('Solar Beam', 'Grass', 'Special', 120, 100, 16, 'Charges turn 1. Hits turn 2. No charge in sunlight.'),
('Sludge Bomb', 'Poison', 'Special', 90, 100, 16, '30% chance to poison the target.'),
('Flamethrower', 'Fire', 'Special', 90, 100, 24, '10% chance to burn the target.'),
('Flare Blitz', 'Fire', 'Physical', 120, 100, 24, 'Has 33% recoil. 10% chance to burn. Thaws user.'),
('Fly','Flying', 'Physical', 90, 85, 24, 'Flies up on first turn, then strikes the next turn.'),
('Fire Blast', 'Fire', 'Special', 110, 85, 8, '10% chance to burn the target.'),
('Seismic Toss', 'Fighting', 'Physical', NULL, 100, 32, 'Does damage equal to the user''s level.'),
('Light Screen', 'Psychic', 'Status', NULL, NULL, 48, 'For 5 turns, special damage to allies is halved.'),
('Sunny Day', 'Fire', 'Status', NULL, NULL, 8, 'For 5 turns, intense sunlight powers Fire moves.'),
('Psychic', 'Psychic', 'Special', 90, 100, 16, '10% chance to lower the target''s Sp. Def by 1.')
;

-- limits the choice of moves each pokemon can have
CREATE TABLE pokemon_movesets 
(
  pokemon_name VARCHAR(30),
  move_name VARCHAR(30),
  PRIMARY KEY(pokemon_name, move_name),
  FOREIGN KEY (pokemon_name) REFERENCES pokemon_bases(pokemon_name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (move_name) REFERENCES p_move(move_name) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO pokemon_movesets VALUES
('Pikachu', 'Quick Attack'),
('Pikachu', 'Skull Bash'),
('Pikachu', 'Thunder'),
('Pikachu', 'Volt Tackle'),
('Pikachu', 'Thunderbolt'),
('Pikachu', 'Iron Tail'),
('Squirtle', 'Water Gun'),
('Squirtle', 'Withdraw'),
('Squirtle', 'Waterfall'),
('Squirtle', 'Hydro Pump'),
('Squirtle', 'Ice Beam'),
('Ivysaur', 'Bullet Seed'),
('Ivysaur', 'Power Whip'),
('Ivysaur', 'Razor Leaf'),
('Ivysaur', 'Solar Beam'),
('Ivysaur', 'Sludge Bomb'),
('Charizard', 'Flamethrower'),
('Charizard', 'Flare Blitz'),
('Charizard', 'Fly'),
('Charizard', 'Fire Blast'),
('Charizard', 'Seismic Toss'),
('Squirtle', 'Return'),
('Ivysaur', 'Return'),
('Charizard', 'Return')
;

-- Pokemon traits that are openly customizable by the user
-- The biggest table in the database
CREATE TABLE pokemon_customs
(
  user_id INT,
  team_id INT,
  slot_id TINYINT UNSIGNED,
  pokemon_name VARCHAR(30),
  nickname VARCHAR(13),
  p_level INT UNSIGNED DEFAULT 100,
  gender VARCHAR(1),
  happiness TINYINT UNSIGNED DEFAULT 255,
  is_shiny BOOLEAN DEFAULT 0,
  item_name VARCHAR(30),
  ability_name VARCHAR(30),
  move_1 VARCHAR(30),
  move_2 VARCHAR(30),
  move_3 VARCHAR(30),
  move_4 VARCHAR(30),
  hp_iv INT UNSIGNED DEFAULT 31,
  attack_iv INT UNSIGNED DEFAULT 31,
  defense_iv INT UNSIGNED DEFAULT 31,
  spatk_iv INT UNSIGNED DEFAULT 31,
  spdef_iv INT UNSIGNED DEFAULT 31,
  speed_iv INT UNSIGNED DEFAULT 31,
  hp_ev INT UNSIGNED DEFAULT 0,
  attack_ev INT UNSIGNED DEFAULT 0,
  defense_ev INT UNSIGNED DEFAULT 0,
  spatk_ev INT UNSIGNED DEFAULT 0,
  spdef_ev INT UNSIGNED DEFAULT 0,
  speed_ev INT UNSIGNED DEFAULT 0,
  nature_name VARCHAR(10) DEFAULT 'Serious',
  PRIMARY KEY (user_id, team_id, slot_id),
  FOREIGN KEY  (user_id, team_id) REFERENCES user_team (user_id, team_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (pokemon_name) REFERENCES pokemon_bases(pokemon_name) ON UPDATE CASCADE ON DELETE CASCADE,   
  FOREIGN KEY (item_name) REFERENCES item(item_name) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (ability_name) REFERENCES ability(ability_name) ON UPDATE CASCADE ON DELETE SET NULL, 
  FOREIGN KEY (move_1) REFERENCES p_move(move_name) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (move_2) REFERENCES p_move(move_name) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (move_3) REFERENCES p_move(move_name) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (move_4) REFERENCES p_move(move_name) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (nature_name) REFERENCES nature(nature_name)
);
INSERT INTO pokemon_customs VALUES
(3, 1, 1, 'Pikachu', NULL, 100, 'F', 255, 0, 'Sitrus Berry', 'Static', 
'Quick Attack', 'Skull Bash', 'Thunder', 'Volt Tackle',
31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 'Jolly'),
(3, 1, 3, 'Squirtle', NULL, 100, 'M', 255, 0, 'Sitrus Berry', 'Torrent', 
'Hydro Pump', 'Withdraw', 'Waterfall', 'Return',
31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 'Quirky'),
(3, 1, 5, 'Ivysaur', NULL, 100, 'M', 255, 0, 'Sitrus Berry', 'Overgrow', 
'Solar Beam', 'Bullet Seed', 'Power Whip', 'Return',
31, 31, 31, 31, 31, 31, 0, 0, 0, 0, 0, 0, 'Bashful')
;

-- view used for computation of total stats given base stats, iv, ev, level and nature
-- used to be 1 table per stat in phase 1; now it's 1 column per stat in phase 2
CREATE VIEW pokemon_total_stats AS
(
  SELECT user_id, team_id, slot_id, pokemon_name,
  ( FLOOR((2 * hp_base + hp_iv + hp_ev/4) * p_level /  CAST(100 AS DECIMAL(5,2)) ) + p_level + 10 ) as hp_total,
  FLOOR( (FLOOR((2 * attack_base + attack_iv + attack_ev/4) * p_level / CAST(100 AS DECIMAL(5,2)) ) + 5) * attack_mult ) as attack_total,
  FLOOR( (FLOOR((2 * defense_base + defense_iv + defense_ev/4) * p_level / CAST(100 AS DECIMAL(5,2)) ) + 5) * defense_mult ) as defense_total,
  FLOOR( (FLOOR((2 * spatk_base + spatk_iv + spatk_ev/4) * p_level / CAST(100 AS DECIMAL(5,2)) ) + 5) * spatk_mult ) as spatk_total,
  FLOOR( (FLOOR((2 * spdef_base + spdef_iv + spdef_ev/4) * p_level / CAST(100 AS DECIMAL(5,2)) ) + 5) * spdef_mult ) as spdef_total,
  FLOOR( (FLOOR((2 * speed_base + speed_iv + speed_ev/4) * p_level / CAST(100 AS DECIMAL(5,2)) ) + 5) * speed_mult ) as speed_total
  FROM pokemon_customs  JOIN pokemon_bases USING(pokemon_name) JOIN nature USING(nature_name)
);


COMMIT;