<template>
  <shadow-hover fullHeight>
    <b-card title="Stats" class="full-height" @click="showStatsModal">
      <b-form-group
        label="HP"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.hp_total"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Atk"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.attack_total"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Def"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.defense_total"></b-form-input>
      </b-form-group>
      <b-form-group
        label="SpA"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.spatk_total"></b-form-input>
      </b-form-group>
      <b-form-group
        label="SpD"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.spdef_total"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Spe"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
        label-cols="3"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.speed_total"></b-form-input>
      </b-form-group>
       <b-form-group
        label="Nature"
        label-size="sm"
        label-align="left"
        label-class="tiny-label"
      >
        <b-form-input id="input-level" size="sm" readonly :value="pokemon.nature_name"></b-form-input>
      </b-form-group>
    </b-card>
  </shadow-hover>
</template>

<script>
export default {
  props: {
    pokemon: Object
  },
  methods: {
    showStatsModal() {
      this.$eventBus.$emit("SHOW_STATS_MODAL", this.pokemon)
    }
  }
};
</script>

<style>
</style>