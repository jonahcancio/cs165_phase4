<template>
  <shadow-hover fullHeight>
    <b-card title="Moves" class="full-height">
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_1" @click="showMoveModal(1)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_2" @click="showMoveModal(2)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_3" @click="showMoveModal(3)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_4" @click="showMoveModal(4)" />
      </div>
    </b-card>
  </shadow-hover>
</template>

<script>
export default {
  props: {
    pokemon: Object
  },
  methods: {
    showMoveModal(_moveNum) {
      this.$eventBus.$emit("SHOW_MOVE_MODAL", {
        pokemon: this.pokemon,
        moveNum: _moveNum
      });
    }
  }
};
</script>

<style>
</style>