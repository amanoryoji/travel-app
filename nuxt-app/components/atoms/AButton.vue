<template>
  <button>{{ props.status }}</button>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
type Props = {
  status: String;
};
const props = defineProps<Props>();
</script>
