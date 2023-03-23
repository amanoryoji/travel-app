<script lang="ts">
type FontSize = "lg" | "md" | "sm";

export default {
  props: {
    message: {
      type: String,
    },
    fontSize: {
      type: String as PropType<FontSize>,
      default: () => "md",
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <p
    v-if="message"
    class="el_errorMessage"
    :class="[
      { el_errorMessage__hidden: !message },
      `el_errorMessage__${fontSize}`,
    ]"
  >
    {{ message }}
  </p>
</template>

<style lang="scss" scoped>
.el_errorMessage {
  height: 1rem;
  font-size: 1rem;
  color: $color-warning;

  &__sm {
    height: 0.75rem;
    font-size: 0.75rem;
  }
  &__lg {
    height: 1.25rem;
    font-size: 1.25rem;
  }

  &__hidden {
    visibility: hidden;
  }
}
</style>
