<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
type Props = {
  status: String;
};
const props = defineProps<Props>();
</script>
