<script lang="ts">
export default {
  props: {
    items: {
      type: Number,
      required: true,
    },
  },
  emits: ["click"],
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<template>
  <div class="pagination">
    <template v-for="link in Number(items)" :key="link">
      <button
        :disabled="link === null"
        :class="{
          'pagination-link-active': link === Number(route.query.page),
        }"
        @click="$emit('click', link)"
      >
        {{ link }}
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.pagination-link-active {
  background: $color-red;
}
</style>
