<template>
  <b-container>
    <pokemon-card
      v-for="pokemon in pokemonCustoms"
      :key="pokemon.slot_id"
      :pokemon="pokemon"
      :typeColorHash="typeColorHash"
    />
    <b-button
      block
      variant="primary"
      class="mb-5"
      @click="showPokemonModal({}, true)"
    >Add New Pokemon</b-button>
    <pokemon-modal
      :pokemonList="pokemonBases"
      :typeColorHash="typeColorHash"
      :initialPokemon="selectedPokemon"
      :isCreate="isCreate"
    />
    <delete-modal :pokemon="selectedPokemon"></delete-modal>
    <item-modal :initialPokemon="selectedPokemon" :itemList="itemList" />
    <details-modal :pokemon="selectedPokemon" />
    <ability-modal :pokemon="selectedPokemon" :abilityList="abilityList" />
    <move-modal
      :pokemon="selectedPokemon"
      :moveList="moveList"
      :moveNum="moveNum"
      :typeColorHash="typeColorHash"
    />
    <stats-modal :pokemon="selectedPokemon" :natureHash="natureHash"/>
  </b-container>
</template>

<script>
const console = window.console;

export default {
  data() {
    return {
      pokemonCustoms: [],
      pokemonBases: [],
      typeColorHash: {},
      itemList: [],
      abilityList: [],
      moveList: [],
      natureHash: {},
      selectedPokemon: {},
      isCreate: false,
      moveNum: 0
    };
  },
  created() {
    this.apiGetPokemonCustoms();
    this.apiGetTypeColors();

    // events
    this.$eventBus.$on("SHOW_POKEMON_MODAL", _pokemon => {
      this.showPokemonModal(_pokemon, false);
    });
    this.$eventBus.$on("SHOW_DELETE_MODAL", this.showDeleteModal);
    this.$eventBus.$on("SHOW_ITEM_MODAL", this.showItemModal);
    this.$eventBus.$on("SHOW_DETAILS_MODAL", this.showDetailsModal);
    this.$eventBus.$on("SHOW_ABILITY_MODAL", this.showAbilityModal);
    this.$eventBus.$on("SHOW_MOVE_MODAL", this.showMoveModal);
    this.$eventBus.$on("SHOW_STATS_MODAL", this.showStatsModal);

    this.$eventBus.$on("REFRESH_POKEMON", this.apiGetPokemonCustoms);
  },
  methods: {
    async showPokemonModal(_pokemon, _isCreate) {
      this.selectedPokemon = _pokemon;
      this.isCreate = _isCreate;
      await this.apiGetPokemonBases();
      this.$bvModal.show("pokemon-modal");
    },
    showDeleteModal(_pokemon) {
      (this.selectedPokemon = _pokemon), this.$bvModal.show("delete-modal");
    },
    async showItemModal(_pokemon) {
      this.selectedPokemon = _pokemon;
      await this.apiGetItems();
      this.$bvModal.show("item-modal");
    },
    showDetailsModal(_pokemon) {
      this.selectedPokemon = _pokemon;
      this.$bvModal.show("details-modal");
    },
    async showAbilityModal(_pokemon) {
      this.selectedPokemon = _pokemon;
      await this.apiGetAbilityList(_pokemon.pokemon_name);
      this.$bvModal.show("ability-modal");
    },
    async showMoveModal(_payload) {
      const { pokemon, moveNum } = _payload;
      this.selectedPokemon = pokemon;
      this.moveNum = moveNum;
      await this.apiGetMoveList(pokemon.pokemon_name);
      this.$bvModal.show("move-modal");
    },
    async showStatsModal(_pokemon) {
      this.selectedPokemon = _pokemon;
      await this.apiGetNatureHash();
      this.$bvModal.show("stats-modal");
    },
    apiGetPokemonCustoms() {
      this.$axios
        .get(`${this.$backendUrl}/user/1/team/1/pokemon/`)
        .then(response => {
          console.log("Get Pokemon Customs", response.data);
          this.pokemonCustoms = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetTypeColors() {
      this.$axios
        .get(`${this.$backendUrl}/readonly/type`)
        .then(response => {
          this.typeColorHash = {};
          for (let p_type of response.data) {
            this.typeColorHash[p_type.type_name] = p_type.type_color;
          }
          console.log("Get Type Colors", this.typeColorHash);
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetPokemonBases() {
      return this.$axios
        .get(`${this.$backendUrl}/readonly/pokemon/`)
        .then(response => {
          console.log("Get Pokemon Bases", response.data);
          this.pokemonBases = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetItems() {
      return this.$axios
        .get(`${this.$backendUrl}/readonly/item/`)
        .then(response => {
          console.log("Get Items", response.data);
          this.itemList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetAbilityList(_pokemon_name) {
      return this.$axios
        .get(`${this.$backendUrl}/readonly/ability/${_pokemon_name}`)
        .then(response => {
          console.log(_pokemon_name)
          console.log("Get Ability", response.data);
          this.abilityList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetMoveList(_pokemon_name) {
      return this.$axios
        .get(`${this.$backendUrl}/readonly/move/${_pokemon_name}`)
        .then(response => {
          console.log(_pokemon_name)
          console.log("Get Move", response.data);
          this.moveList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetNatureHash() {
      return this.$axios
        .get(`${this.$backendUrl}/readonly/nature`)
        .then(response => {
          this.natureHash = {};
          for (let nature of response.data) {
            this.natureHash[nature.nature_name] = nature;
          }
          console.log("Get Nature Hash", this.natureHash);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
