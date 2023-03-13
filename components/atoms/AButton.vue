<script lang="ts" setup>
import { defineProps } from "vue";

type Props = {
  status: String;
};

const props = defineProps<Props>();
const addTest = function () {
  console.log("test");
};
</script>

<template>
  <button @addTest="addTest">
    {{ props.status }}
  </button>
</template>
