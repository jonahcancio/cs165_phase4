<template>
  <div>
    <b-modal id="stats-modal" scrollable size="xl" @shown="initStats" @ok="apiPutStats">
      <b-row class="font-weight-bold">
        <b-col>Stat</b-col>
        <b-col>Base</b-col>
        <b-col>IV</b-col>
        <b-col>EV</b-col>
        <b-col>Boost</b-col>
        <b-col>Total</b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>HP</b-col>
        <b-col>
          <b-form-input size="md" readonly v-model="hp.base" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="hp.iv" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="hp.ev" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="boostString('hp')" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="statTotal('hp')" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>Attack</b-col>
        <b-col>
          <b-form-input size="md" readonly v-model="atk.base" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="atk.iv" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="atk.ev" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="boostString('attack')" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="statTotal('attack')" />
        </b-col>
      </b-row>

      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary" :disabled="disableSubmit">Update Stats</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const console = window.console;

export default {
  props: {
    pokemon: Object,
    natureHash: Object
  },
  data() {
    return {
      nature: this.pokemon.nature_name,
      hp: {
        base: 0,
        iv: 0,
        ev: 0
      },
      atk: {
        base: 0,
        iv: 0,
        ev: 0
      },
      def: {
        base: 0,
        iv: 0,
        ev: 0
      },
      spa: {
        base: 0,
        iv: 0,
        ev: 0
      },
      spd: {
        base: 0,
        iv: 0,
        ev: 0
      },
      spe: {
        base: 0,
        iv: 0,
        ev: 0
      }
    };
  },
  methods: {
    initStats() {
      const { pokemon } = this;
      this.nature = pokemon.nature_name;
      this.hp = {
        base: pokemon.hp_base,
        iv: pokemon.hp_iv,
        ev: pokemon.hp_ev
      };
      this.atk = {
        base: pokemon.attack_base,
        iv: pokemon.attack_iv,
        ev: pokemon.attack_ev
      };
      this.def = {
        base: pokemon.defense_base,
        iv: pokemon.defense_iv,
        ev: pokemon.defense_ev
      };
      this.spa = {
        base: pokemon.spatk_base,
        iv: pokemon.spatk_iv,
        ev: pokemon.spatk_ev
      };
      this.spd = {
        base: pokemon.spdef_base,
        iv: pokemon.spdef_iv,
        ev: pokemon.spdef_ev
      };
      this.spe = {
        base: pokemon.speed_base,
        iv: pokemon.speed_iv,
        ev: pokemon.speed_ev
      };
    },
    apiPutStats() {
      const { slot_id } = this.pokemon;
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {})
        .then(response => {
          console.log("PUT Stats Success: ", response);
          this.$eventBus.$emit("REFRESH_POKEMON");
        })
        .catch(error => {
          console.log("PUT Stats Error: ", error);
        });
    },
    boostString(stat) {
      const natureObj = this.natureHash[this.nature];
      const multiplier = natureObj && Number(natureObj[`${stat}_mult`]);
      if (multiplier > 1) {
        return "+";
      } else if (multiplier < 1) {
        return "–";
      } else {
        return "";
      }
    },
    statTotal(stat) {
      const p = this.pokemon;
      if (stat == "hp") {
        return (
          Math.floor(
            ((2 * this["hp"].base +
              this["hp"].iv +
              Math.floor(Math.sqrt(this["hp"].ev) / 4)) *
              p["p_level"]) /
              100
          ) +
          p["p_level"] +
          10
        );
      } else {
        // const natureObj = this.natureHash[this.nature];
        // const natureMult = natureObj && Number(natureObj[`${stat}_mult`]);
        // return (
        //   (Math.floor(
        //     ((2 * this[`${stat}`].base +
        //       this[`${stat}`].iv +
        //       Math.floor(Math.sqrt(this[`${stat}`].ev) / 4)) *
        //       p[`${stat}`]) /
        //       100
        //   ) +
        //     5) *
        //   natureMult
        // );
        return 0
      }
    }
  },

  computed: {
    disableSubmit() {
      return true;
    }
  }
};
</script>

<style>
</style>