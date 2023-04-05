<script lang="ts">
// import { defineComponent, PropType } from "@vue/composition-api";

export type Size = "lg" | "md" | "sm" | "xsm" | "xxsm";

type Variant = "normal" | "primary" | "secondary" | "tertiary";

export default defineComponent({
  name: "LoadingSpinner",
  props: {
    /** スピナーのサイズ */
    size: {
      type: String as PropType<Size>,
      default: () => "md",
    },
    /** スピナーの色 */
    variant: {
      type: String as PropType<Variant>,
      default: () => "normal",
    },
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div
    class="el_loadingSpinner"
    :class="`el_loadingSpinner__${size} el_loadingSpinner__${variant}`"
  />
</template>

<style lang="scss" scoped>
$base-border-color: rgba(255, 255, 255, 0.2);

@mixin size($size) {
  width: 10 * $size + rem;
  height: 10 * $size + rem;
  font-size: 0.625 * $size + rem;
  border-top: 1.3 * $size + rem solid $base-border-color;
  border-right: 1.3 * $size + rem solid $base-border-color;
  border-bottom: 1.3 * $size + rem solid $base-border-color;
  border-left: 1.3 * $size + rem solid #fff;
}

.el_loadingSpinner {
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 10rem;
  font-size: 0.625rem;
  border-top: 1.3rem solid $base-border-color;
  border-right: 1.3rem solid $base-border-color;
  border-bottom: 1.3rem solid $base-border-color;
  border-left: 1.3rem solid #fff;
  border-radius: 50%;
  transform: translateZ(0);
  animation: load 0.8s infinite linear;

  &__xxsm {
    $size: 0.2;
    @include size($size);
  }
  &__xsm {
    $size: 0.4;
    @include size($size);
  }
  &__sm {
    $size: 0.8;
    @include size($size);
  }
  &__lg {
    $size: 1.2;
    @include size($size);
  }

  &__primary {
    border-left-color: $color-primary;
  }
  &__secondary {
    border-left-color: $color-secondary;
  }
  &__tertiary {
    border-left-color: $color-tertiary;
  }

  &::after {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
