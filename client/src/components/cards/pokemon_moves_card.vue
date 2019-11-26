<template>
  <shadow-hover fullHeight>
    <b-card title="Moves" class="full-height">
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_1" @click="bazinga(1)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_2" @click="bazinga(2)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_3" @click="bazinga(3)" />
      </div>
      <div class="mb-3">
        <b-form-input readonly :value="pokemon.move_4" @click="bazinga(4)" />
      </div>
    </b-card>
  </shadow-hover>
</template>

<script>
const console = window.console

export default {
  props: {
    pokemon: {
      type: Object
    }
  },
  methods: {
    bazinga(num) {
      console.log(num)
    }
  }
};
</script>

<style>
</style>