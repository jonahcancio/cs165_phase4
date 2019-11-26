<template>
  <div>
    <b-modal id="delete-modal" size="xl">
      <b-img center :src="imgUrl" thumbnail class="mb-3 header-img" />
      <div>
        Are you sure you want to delete
        <span class="font-weight-bold">{{ pokemon.pokemon_name }}?</span>
      </div>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="danger">Delete {{ pokemon.pokemon_name }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    imgUrl() {
      const img = this.pokemon && this.pokemon.normal_image;
      return img
        ? "http://localhost:3000/static/" + img
        : require("@/assets/mystery_pokemon.jpg");
    }
  }
};
</script>

<style>
.header-img {
  height: 150px;
}
</style>