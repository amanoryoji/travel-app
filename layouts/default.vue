<script lang="ts" setup>
const { isLoginLoading } = useAuth();
</script>

<template>
  <div v-if="isLoginLoading" class="ly_container">
    <OGlobalNav class="ly_header" />
    <main>
      <div class="ly_main_content">
        <slot />
      </div>
    </main>
  </div>
</template>
