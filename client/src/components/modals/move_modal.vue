<template>
  <div>
    <b-modal id="move-modal" scrollable size="xl" @shown="initMoveTable" @ok="apiPutMove">
      <b-table
        hover
        ref="moveTable"
        @row-selected="onMoveSelected"
        selectable
        select-mode="single"
        :fields="fields"
        :items="moveList"
      >
        <template v-slot:cell(move_type)="data">
          <b-badge
            :style="{ backgroundColor: typeColorHash[data.value] }"
            class="type-text mx-1"
          >{{ data.value }}</b-badge>
        </template>
      </b-table>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">Update Move</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const console = window.console;

export default {
  props: {
    moveList: Array,
    pokemon: Object,
    moveNum: Number,
    typeColorHash: Object
  },
  data() {
    return {
      fields: [
        { key: "move_name", label: "Move" },
        { key: "move_type", label: "Type" },
        { key: "move_category", label: "Cat" },
        { key: "move_power", label: "Pow" },
        { key: "move_accuracy", label: "Acc" },
        { key: "move_pp", label: "PP" },
        { key: "move_effect", label: "Effect" }
      ],
      selectedMove: null
    };
  },
  methods: {
    initMoveTable() {
      this.selectedMove = null;
      const index = this.moveList.findIndex(
        move => move.move_name == this.pokemon.move_name
      );
      this.$refs.moveTable.selectRow(index);
      console.log(index);
    },
    onMoveSelected(items) {
      console.log("selected", items);
      this.selectedMove = items[0];
    },
    apiPutMove() {
      const { slot_id } = this.pokemon;
      const { move_name } = this.selectedMove;
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {
          [`move_${this.moveNum}`]: move_name
        })
        .then(response => {
          console.log("PUT Move Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Move Error: ", error);
        });
    }
  },
  computed: {
    disableSubmit() {
      const { selectedMove, pokemon } = this;
      return !selectedMove || selectedMove.move_name == pokemon.move_name;
    }
  }
};
</script>

<style>
</style>