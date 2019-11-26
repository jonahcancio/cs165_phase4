<template>
  <shadow-hover fullHeight>
    <b-card class="full-height" body-class="d-flex flex-column justify-content-between">
      <b-form-group label="Nickname" label-size="sm" label-align="left" label-class="tiny-label">
        <b-form-input
          id="input-nickname"
          size="sm"
          readonly
          :value="pokemon.nickname || pokemon.pokemon_name"
        ></b-form-input>
      </b-form-group>
      <div>
        <b-img :src="imgUrl(pokemon.normal_image)" width="100" thumbnail class="pokemon-img" />
      </div>
      <div class="d-flex justify-content-center">
        <b-badge
          :style="{ backgroundColor: typeColorHash[pokemon.type_1] }"
          class="type-text mx-1"
        >{{ pokemon.type_1 }}</b-badge>
        <b-badge
          :style="{ backgroundColor: typeColorHash[pokemon.type_2] }"
          class="type-text mx-1"
        >{{ pokemon.type_2 }}</b-badge>
      </div>
      <b-form-group label="Pokemon" label-size="md" label-align="left" label-class="medium-label">
        <b-form-input
          id="input-pokemon"
          size="md"
          readonly
          :value="pokemon.pokemon_name"
          @click="showPokemonModal"
        ></b-form-input>
      </b-form-group>
    </b-card>
  </shadow-hover>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    typeColorHash: Object
  },
  methods: {
    showPokemonModal() {
      this.$eventBus.$emit("SHOW_POKEMON_MODAL", this.pokemon);      
    },
    imgUrl(img) {
      return "http://localhost:3000/static/" + img;
    }
  }
};
</script>

<style>
</style>