<script lang="ts" setup>
const { isLoginLoading } = useAuth();
</script>

<template>
  <div v-if="isLoginLoading">
    <OGlobalNav />
    <slot />
  </div>
</template>
