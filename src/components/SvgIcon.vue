<template>
  <!-- aria-hidden: 让这个元素对浏览器隐藏 -->
  <svg
    :class="svgClass"
    :style="{ color, width, height }"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: String,
    color: String,
    width: String,
    height: String,
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      let className = this.className ? `icon-${this.className}` : "";
      return ["svg-icon", className];
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>
