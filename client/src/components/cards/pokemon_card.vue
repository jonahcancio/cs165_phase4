<template>
  <div>
  <b-card header-tag="header" class="mb-4" body-class="p-0">
    <template v-slot:header>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" size="sm" @click="showDeleteModal">Delete</b-button>
      </div>
    </template>
    <b-row no-gutters>
      <b-col>
        <pokemon-name-card :pokemon="pokemon" :typeColorHash="typeColorHash"/>
      </b-col>
      <b-col cols="4" class="d-flex flex-column">
        <pokemon-details-card :pokemon="pokemon" />
        <shadow-hover fullHeight>
          <b-card class="full-height">
            <b-form-group
              label="Item"
              label-size="sm"
              label-align="center"
              label-class="medium-label"
            >
              <b-form-input readonly :value="pokemon.item_name" />
            </b-form-group>
          </b-card>
        </shadow-hover>
        <shadow-hover fullHeight>
          <b-card class="full-height">
            <b-form-group
              label="Ability"
              label-size="sm"
              label-align="center"
              label-class="medium-label"
            >
              <b-form-input readonly :value="pokemon.ability_name" />
            </b-form-group>
          </b-card>
        </shadow-hover>
      </b-col>
      <b-col>
        <pokemon-moves-card :pokemon="pokemon" />
      </b-col>
      <b-col>
        <pokemon-stats-card :pokemon="pokemon" />
      </b-col>
    </b-row>
  </b-card>  
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    typeColorHash: Object
  },
  data() {
    return {
      
    };
  },
  methods: {
    showDeleteModal() {
      this.$eventBus.$emit("SHOW_DELETE_MODAL", this.pokemon);  
    }
  }
};
</script>

<style>
.full-height {
  height: 100%;
}

.tiny-label.tiny-label {
  font-size: 0.75rem;
}

.medium-label.medium-label {
  font-size: 1rem;
}

.type-text {
  text-shadow: 1px 1px 1px black;
}
</style>