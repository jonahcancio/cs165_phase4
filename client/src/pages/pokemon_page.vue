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
      selectedPokemon: {},
      isCreate: false
    };
  },
  created() {
    this.apiGetPokemonCustoms();
    this.apiGetTypeColors();

    // events
    this.$eventBus.$on("SHOW_POKEMON_MODAL", _pokemon => {
      this.showPokemonModal(_pokemon, false);
    });
    this.$eventBus.$on("SHOW_DELETE_MODAL",this.showDeleteModal);
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
    apiGetPokemonCustoms() {
      this.$axios
        .get("http://localhost:3000/user/3/team/1/pokemon/")
        .then(response => {
          console.log(response.data);
          this.pokemonCustoms = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetTypeColors() {
      this.$axios
        .get("http://localhost:3000/readonly/type")
        .then(response => {
          this.typeColorHash = {};
          for (let p_type of response.data) {
            this.typeColorHash[p_type.type_name] = p_type.type_color;
          }
          console.log(this.typeColorHash);
        })
        .catch(error => {
          console.log(error);
        });
    },
    apiGetPokemonBases() {
      return this.$axios
        .get("http://localhost:3000/readonly/pokemon/")
        .then(response => {
          console.log(response.data);
          this.pokemonBases = response.data;
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
