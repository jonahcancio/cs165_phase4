<template>
  <div>
    <b-modal id="pokemon-modal" scrollable size="xl" @shown="initPokemonTable" @ok="handleSubmit">
      <b-img center :src="imgUrl" thumbnail class="mb-3 header-img" />

      <b-table
        hover
        ref="pokemonTable"
        @row-selected="onPokemonSelected"
        selectable
        select-mode="single"
        :fields="fields"
        :items="pokemonList"
      >
        <template v-slot:cell(types)="data">
          <b-badge
            :style="{ backgroundColor: typeColorHash[data.item.type_1] }"
            class="type-text mx-1"
          >{{ data.item.type_1 }}</b-badge>
          <b-badge
            :style="{ backgroundColor: typeColorHash[data.item.type_2] }"
            class="type-text mx-1"
          >{{ data.item.type_2 }}</b-badge>
        </template>
      </b-table>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">{{ saveText }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const console = window.console;

export default {
  props: {
    pokemonList: {
      type: Array
    },
    typeColorHash: {
      type: Object
    },
    initialPokemon: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fields: [
        { key: "pokemon_name", label: "Pokemon" },
        { key: "types", label: "Types" },
        { key: "hp_base", label: "HP" },
        { key: "atk_base", label: "Atk" },
        { key: "def_base", label: "Def" },
        { key: "spa_base", label: "SpA" },
        { key: "spd_base", label: "SpD" },
        { key: "spe_base", label: "Spe" }
      ],
      selectedPokemon: null
    };
  },
  methods: {
    initPokemonTable() {
      this.selectedPokemon = null;
      const index = this.pokemonList.findIndex(
        pokemon => pokemon.pokemon_name == this.initialPokemon.pokemon_name
      );
      this.$refs.pokemonTable.selectRow(index);
      console.log(index);
    },
    onPokemonSelected(items) {
      console.log("selected", items);
      this.selectedPokemon = items[0];
    },
    handleSubmit() {
      console.log("Submitting Pokemon Form");
      this.isCreate ? this.apiPostPokemon() : this.apiPutPokemon();
    },
    apiPostPokemon() {
      const { pokemon_name } = this.selectedPokemon;
      this.$axios
        .post("http://localhost:3000/user/3/team/1/pokemon", {
          pokemon_name: pokemon_name
        })
        .then(response => {
          console.log("POST Pokemon Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("Post Pokemon Error: ", error);
        });
    },
    apiPutPokemon() {
      const { slot_id } = this.initialPokemon;
      const { pokemon_name } = this.selectedPokemon;
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {
          pokemon_name: pokemon_name,
          ability_name: null,
          move_1: null,
          move_2: null,
          move_3: null,
          move_4: null
          // hp_iv: 31,
          // atk_iv: 31,
          // def_iv: 31,
          // spa_iv: 31,
          // spd_iv: 31,
          // spe_iv: 31,
          // hp_ev: 0,
          // atk_ev: 0,
          // def_ev: 0,
          // spa_ev: 0,
          // spd_ev: 0,
          // spe_ev: 0
        })
        .then(response => {
          console.log("PUT Pokemon Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Pokemon Error: ", error);
        });
    }
  },
  computed: {
    imgUrl() {
      const img = this.selectedPokemon && this.selectedPokemon.normal_image;
      return img
        ? "http://localhost:3000/static/" + img
        : require("@/assets/mystery_pokemon.jpg");
    },
    saveText() {
      return this.isCreate ? "Add Pokemon" : "Update Pokemon";
    },
    disableSubmit() {
      const { selectedPokemon, initialPokemon } = this;
      return (
        !selectedPokemon ||
        selectedPokemon.pokemon_name == initialPokemon.pokemon_name
      );
    }
  }
};
</script>

<style>
.header-img {
  height: 150px;
}
</style>