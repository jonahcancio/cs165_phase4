<template>
  <div>
    <b-modal id="delete-modal" size="xl" @ok="apiDeletePokemon">
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
const console = window.console;

export default {
  props: {
    pokemon: Object
  },
  data() {
    return {};
  },
  methods: {
    apiDeletePokemon() {
      const { slot_id } = this.pokemon;
      this.$axios
        .delete(`${this.$backendUrl}/user/1/team/1/pokemon/${slot_id}`)
        .then(response => {
          console.log("DELETE Pokemon Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("DELETE Pokemon Error: ", error);
        });
    }
  },
  computed: {
    imgUrl() {
      const img = this.pokemon && this.pokemon.normal_image;
      return img
        ? `${this.$backendUrl}/static/` + img
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