<template>
  <b-container>
    <b-card header-tag="header" body-class="p-0">
      <template v-slot:header>
        <h6 class="mb-0">Header Slot</h6>
      </template>
      <b-row no-gutters>
        <b-col>
          <shadow-hover fullHeight>
            <b-card title="Pokemon" class="full-height">
              <div>Nickname</div>
              <div>Picture</div>
              <div>Type</div>
              <div>Species</div>
            </b-card>
          </shadow-hover>
        </b-col>
        <b-col cols="4" class="d-flex flex-column">
          <shadow-hover>
            <b-card title="Details">
              <b-row no-gutters>
                <b-col cols="3">
                  <b-form-group
                    label="Level"
                    label-size="sm"
                    label-align="left"
                    label-class="tiny-label"
                  >
                    <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Happiness"
                    label-size="sm"
                    label-align="left"
                    label-class="tiny-label"
                  >
                    <b-form-input id="input-happiness" size="sm" readonly value="255"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Gender"
                    label-size="sm"
                    label-align="left"
                    label-class="tiny-label"
                  >
                    <b-form-input id="input-gender" size="sm" readonly value="Female"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Shiny"
                    label-size="sm"
                    label-align="left"
                    label-class="tiny-label"
                  >
                    <b-form-input id="input-shiny" size="sm" readonly value="No"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </shadow-hover>
          <b-row no-gutters class="flex-fill">
            <b-col>
              <shadow-hover fullHeight>
                <b-card title="Item" class="full-height">
                  <b-form-input readonly value="Shuca Berry" @click="bazinga('Shuca Berry')" />
                </b-card>
              </shadow-hover>
            </b-col>
            <b-col>
              <shadow-hover fullHeight>
                <b-card title="Ability" class="full-height">
                  <b-form-input readonly value="Static" @click="bazinga('Static')" />
                </b-card>
              </shadow-hover>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <shadow-hover fullHeight>
            <b-card title="Moves" class="full-height">
              <div class="mb-1">
                <b-form-input readonly value="Volt Tackle" @click="bazinga(1)" />
              </div>
              <div class="mb-1">
                <b-form-input readonly value="Thunderbolt" @click="bazinga(2)" />
              </div>
              <div class="mb-1">
                <b-form-input readonly value="Iron Tail" @click="bazinga(3)" />
              </div>
              <div class="mb-1">
                <b-form-input readonly value="Quick Attack" @click="bazinga(4)" />
              </div>
            </b-card>
          </shadow-hover>
        </b-col>
        <b-col>
          <shadow-hover fullHeight>
            <b-card title="Stats" class="full-height">
              <b-form-group
                label="HP"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Atk"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Def"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
              <b-form-group
                label="SpA"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
              <b-form-group
                label="SpD"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Spe"
                label-size="sm"
                label-align="left"
                label-class="tiny-label"
                label-cols="3"
              >
                <b-form-input id="input-level" size="sm" readonly value="100"></b-form-input>
              </b-form-group>
            </b-card>
          </shadow-hover>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
const console = window.console;

export default {
  data() {
    return {
      items: [{ pokemon_name: "Pikachu" }, { pokemon_name: "Ivysaur" }]
    };
  },
  methods: {
    bazinga(moveNum) {
      console.log(moveNum);
    }
  }
};
</script>

<style>
.full-height {
  height: 100%;
}

.tiny-label {
  font-size: 0.75rem;
}
</style>
