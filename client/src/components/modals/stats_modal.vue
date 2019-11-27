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
      <b-row v-for="(val, key) in stats" :key="key" class="mb-3">
        <b-col>{{ val.title }}</b-col>
        <b-col>
          <b-form-input size="md" readonly v-model="val.base" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="val.iv" type="number" />
        </b-col>
        <b-col>
          <b-form-input size="md" v-model="val.ev" type="number" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="boostString(key)" />
        </b-col>
        <b-col>
          <b-form-input size="md" readonly :value="statTotal(key)" />
        </b-col>
      </b-row>
      <b-form-group
        label="Nature"
        label-size="sm"
        label-align="left"
        label-class="medium-label font-weight-bold"
      >
        <b-form-select v-model="nature" :options="natureOptions"></b-form-select>
      </b-form-group>
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="ok" variant="primary">Update Stats</b-button>
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
      stats: {
        hp: {title: "HP"},
        atk: {title: "Attack"},
        def: {title: "Defense"},
        spa: {title: "Sp. Atk"},
        spd: {title: "Sp. Def"},
        spe: {title: "Speed"}
      },
      natureOptions: []
    };
  },
  methods: {
    initStats() {
      const { pokemon } = this;
      this.nature = pokemon.nature_name;
      for (let stat in this.stats) {
        this.stats[stat] = {
          ...this.stats[stat],
          base: Number(pokemon[`${stat}_base`]),
          iv: Number(pokemon[`${stat}_iv`]),
          ev: Number(pokemon[`${stat}_ev`])
        };
      }
      this.natureOptions = [];
      for (let nature in this.natureHash) {
        this.natureOptions.push({ value: nature, text: nature });
      }
    },
    apiPutStats() {
      const { slot_id } = this.pokemon;
      const s = this.stats
      this.$axios
        .put(`http://localhost:3000/user/3/team/1/pokemon/${slot_id}`, {
          hp_iv: s.hp.iv,
          atk_iv: s.atk.iv,
          def_iv: s.def.iv,
          spa_iv: s.spa.iv,
          spd_iv: s.spd.iv,
          spe_iv: s.spe.iv,
          hp_ev: s.hp.ev,
          atk_ev: s.atk.ev,
          def_ev: s.def.ev,
          spa_ev: s.spa.ev,
          spd_ev: s.spd.ev,
          spe_ev: s.spe.ev,
          nature_name: this.nature
        })
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
      const s = this.stats;
      s[stat].base = Number(s[stat].base);
      s[stat].iv = Number(s[stat].iv);
      s[stat].ev = Number(s[stat].ev);
      // console.log(stat, s[stat].ev, typeof s[stat].ev)

      if (stat == "hp") {
        return (
          Math.floor(
            ((2 * s[stat].base + s[stat].iv + Math.floor(s[stat].ev / 4)) *
              p["p_level"]) /
              100
          ) +
          p["p_level"] +
          10
        );
      } else {
        const natureObj = this.natureHash[this.nature];
        const natureMult = natureObj && Number(natureObj[`${stat}_mult`]);
        return Math.round(
          (Math.floor(
            ((2 * s[stat].base + s[stat].iv + Math.floor(s[stat].ev / 4)) *
              p["p_level"]) /
              100
          ) +
            5) *
            natureMult
        );
      }
    }
  },

  computed: {
  }
};
</script>

<style>
</style>