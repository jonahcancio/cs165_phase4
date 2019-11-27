<template>
  <div>
    <b-modal id="details-modal" scrollable size="xl" @ok="apiPutItem">
      <b-form-group label="Level:" label-size="md" label-align="left" label-class="medium-label">
        <b-form-input id="input-level" type="number" size="md" v-model="level" />
      </b-form-group>
      <b-form-group
        label="Happiness:"
        label-size="md"
        label-align="left"
        label-class="medium-label"
      >
        <b-form-input id="input-happiness" type="number" size="md" v-model="happiness" />
      </b-form-group>
      <b-form-group label="Gender:" label-size="md" label-align="left" label-class="medium-label">
        <b-form-select v-model="gender" :options="genderOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Shiny:" label-size="md" label-align="left" label-class="medium-label">
        <b-form-select v-model="isShiny" :options="shinyOptions"></b-form-select>
      </b-form-group>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">Update Details</b-button>
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
    return {
      level: this.pokemon.p_level || 0,
      happiness: this.pokemon.happiness || 255,
      gender: this.pokemon.gender || null,
      isShiny: this.pokemon.is_shiny,
      genderOptions: [
        { value: "M", text: "Male" },
        { value: "F", text: "Female" },
        { value: null, text: "None" }
      ],
      shinyOptions: [{ value: 1, text: "Yes" }, { value: 0, text: "No" }]
    };
  },
  watch: {
    pokemon(pokemon) {
      this.level = pokemon.p_level || 0;
      this.happiness = pokemon.happiness || 255;
      this.gender = pokemon.gender || null;
      this.isShiny = pokemon.is_shiny;
    }
  },
  methods: {
    apiPutItem() {
      const { slot_id } = this.pokemon;
      const { level, happiness, gender, isShiny } = this;
      console.log(this.level);
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {
          p_level: level,
          happiness: happiness,
          gender: gender,
          is_shiny: isShiny
        })
        .then(response => {
          console.log("PUT Details Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Details Error: ", error);
        });
    }
  },
  computed: {
    disableSubmit() {
      const { pokemon, level, happiness, gender, isShiny } = this;
      return (
        pokemon.p_level == level &&
        pokemon.happiness == happiness &&
        pokemon.gender == gender &&
        pokemon.is_shiny == isShiny
      );
    }
  }
};
</script>

<style>
</style>