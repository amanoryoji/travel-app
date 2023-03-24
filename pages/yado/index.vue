<script lang="ts">
import { onMounted } from "vue";

export default {
  props: {
    message: {
      type: String,
      default: "デフォルト",
    },
  },
  setup() {
    // const testFn = function () {
    //   console.log(message);
    // };
    // onMounted(() => {
    //   testFn();
    // });
  },
};
</script>

<template>
  <div> 
    yadoです
    <p>{{ message }}</p>
  </div>
</template>
