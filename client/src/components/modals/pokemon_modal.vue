<template>
  <div>
    <b-modal id="pokemon-modal" scrollable size="xl" @shown="initPokemonTable">
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
        <b-button @click="ok" variant="primary" :disabled="!selectedPokemon">{{ saveText }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
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
        { key: "attack_base", label: "Atk" },
        { key: "defense_base", label: "Def" },
        { key: "spatk_base", label: "SpA" },
        { key: "spdef_base", label: "SpD" },
        { key: "speed_base", label: "Spe" }
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
      this.$console.log(index);
    },
    onPokemonSelected(items) {
      this.$console.log("selected", items);
      this.selectedPokemon = items[0];
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
      return this.isCreate? "Add Pokemon" : "Update Pokemon"
    }
  }
};
</script>

<style>
.header-img {
  height: 150px;
}
</style>