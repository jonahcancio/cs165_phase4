<template>
  <div>
    <b-modal id="item-modal" scrollable size="xl" @shown="initItemTable" @ok="apiPutItem">
      <b-table
        hover
        ref="itemTable"
        @row-selected="onItemSelected"
        selectable
        select-mode="single"
        :fields="fields"
        :items="itemList"
      >
      </b-table>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">Update Item</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const console = window.console;

export default {
  props: {
    itemList: {
      type: Array
    },
    initialPokemon: {
      type: Object
    }
  },
  data() {
    return {
      fields: [
        { key: "item_name", label: "Item" },
        { key: "item_description", label: "Description" },
      ],
      selectedItem: null
    };
  },
  methods: {
    initItemTable() {
      this.selectedItem = null;
      const index = this.itemList.findIndex(
        item => item.item_name == this.initialPokemon.item_name
      );
      this.$refs.itemTable.selectRow(index);
      console.log(index);
    },
    onItemSelected(items) {
      console.log("selected", items);
      this.selectedItem = items[0];
    },
    apiPutItem() {
      const { slot_id } = this.initialPokemon;
      const { item_name } = this.selectedItem;
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {
          item_name: item_name          
        })
        .then(response => {
          console.log("PUT Item Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Item Error: ", error);
        });
    }
  },
  computed: {
    disableSubmit() {
      const { selectedItem, initialPokemon } = this;
      return (
        !selectedItem ||
        selectedItem.item_name == initialPokemon.item_name
      );
    }
  }
};
</script>

<style>
</style>