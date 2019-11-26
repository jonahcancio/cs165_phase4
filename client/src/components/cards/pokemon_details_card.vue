<template>
  <shadow-hover>
    <b-card title="Details">
      <b-row no-gutters>
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
            <b-form-input id="input-gender" size="sm" readonly :value="pokemon.gender"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Shiny" label-size="sm" label-align="left" label-class="tiny-label">
            <b-form-input id="input-shiny" size="sm" readonly :value="pokemon.is_shiny"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </shadow-hover>
</template>

<script>
export default {
   props: {
    pokemon: {
      type: Object
    }
  },
};
</script>

<style>
</style>