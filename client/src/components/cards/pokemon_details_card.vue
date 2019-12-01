<template>
  <shadow-hover>
    <b-card title="Details">
      <b-row no-gutters @click="showDetailsModal">
        <b-col cols="3">
          <b-form-group label="Level" label-size="sm" label-align="left" label-class="tiny-label">
            <b-form-input id="input-level" size="sm" readonly :value="pokemon.p_level"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group
            label="Happiness"
            label-size="sm"
            label-align="left"
            label-class="tiny-label"
          >
            <b-form-input id="input-happiness" size="sm" readonly :value="pokemon.happiness"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Gender" label-size="sm" label-align="left" label-class="tiny-label">
            <b-form-input id="input-gender" size="sm" readonly :value="genderString"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Shiny" label-size="sm" label-align="left" label-class="tiny-label">
            <b-form-input id="input-shiny" size="sm" readonly :value="shinyString"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </shadow-hover>
</template>

<script>
export default {
  props: {
    pokemon: Object
  },
  data() {
    return {};
  },
  methods: {
    showDetailsModal() {
      this.$eventBus.$emit("SHOW_DETAILS_MODAL", this.pokemon);
    }
  },
  computed: {
    shinyString() {
      return this.pokemon.is_shiny ? "Yes" : "No";
    },
    genderString() {
      return this.pokemon.gender || 'None'
    }
  }
};
</script>

<style>
</style>