<template>
  <div>
  <b-modal id="ability-modal" scrollable size="xl" @shown="initAbilityTable" @ok="apiPutAbility">
      <b-table
        hover
        ref="abilityTable"
        @row-selected="onAbilitySelected"
        selectable
        select-mode="single"
        :fields="fields"
        :items="abilityList"
      >
      </b-table>      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">Update Ability</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const console = window.console;

export default {
  props: {
    abilityList: {
      type: Array
    },
    pokemon: {
      type: Object
    }
  },
  data() {
    return {
      fields: [
        { key: "ability_name", label: "Ability" },
        { key: "ability_description", label: "Description" },
      ],
      selectedAbility: null
    };
  },
  methods: {
    initAbilityTable() {
      this.selectedAbility = null;
      const index = this.abilityList.findIndex(
        ability => ability.ability_name == this.pokemon.ability_name
      );
      this.$refs.abilityTable.selectRow(index);
      console.log(index);
    },
    onAbilitySelected(items) {
      console.log("selected", items);
      this.selectedAbility = items[0];
    },
    apiPutAbility() {
      const { slot_id } = this.pokemon;
      const { ability_name } = this.selectedAbility;
      this.$axios
        .put(`${this.$backendUrl}/user/1/team/1/pokemon/${slot_id}`, {
          ability_name: ability_name          
        })
        .then(response => {
          console.log("PUT Ability Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Ability Error: ", error);
        });
    }
  },
  computed: {
    disableSubmit() {
      const { selectedAbility, pokemon } = this;
      return (
        !selectedAbility ||
        selectedAbility.ability_name == pokemon.ability_name
      );
    }
  }
};
</script>

<style>
</style>