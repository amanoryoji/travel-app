<script lang="ts" setup>
type Size = 'xlg' | 'lg' | 'md' | 'sm'

interface Props {
  title: string
  /** フォントのサイズ */
  size?: Size
  /** フォントをboldにするか否か */
  bold?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  bold: false,
})
</script>

<template>
  <h1
    class="el_pageTitle"
    :class="[`el_pageTitle__${props.size}`, { el_pageTitle__bold: props.bold }]"
  >
    {{ props.title }}
  </h1>
</template>

<style lang="scss" scoped>
$line-height: 1.15;

.el_pageTitle {
  $parent: &;
  line-height: $line-height;

  &__xlg {
    font-size: $title-font-size-xlg;
    height: calc($title-font-size-xlg * $line-height);
  }

  &__lg {
    font-size: $title-font-size-lg;
    height: calc($title-font-size-lg * $line-height);
  }

  &__md {
    font-size: $title-font-size-md;
    height: calc($title-font-size-md * $line-height);
  }

  &__sm {
    font-size: $title-font-size-sm;
    height: calc($title-font-size-sm * $line-height);
  }

  &__bold {
    font-weight: 700;
  }
}
</style>
