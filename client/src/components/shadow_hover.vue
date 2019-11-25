<template>
  <div
    :class="[shadowClass, heightClass]"
    @mouseover="showShadow" 
    @mouseout="hideShadow"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    fullHeight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShadowed: false
    };
  },
  computed: {
    shadowClass() {
      return this.isShadowed? 'shadow' : 'no-shadow'
    },
    heightClass() {
      return this.fullHeight? 'full-height' : ''
    }
  },
  methods: {
    showShadow() {
      this.isShadowed = true;
    },
    hideShadow() {
      this.isShadowed = false;
    }
  }
};
</script>

<style scoped>
.full-height {
  height:100%;
}
</style>
