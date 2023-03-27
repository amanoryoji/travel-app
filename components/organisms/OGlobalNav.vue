<script lang="ts" setup>
const { signOut } = useAuth();

const { token } = useAuth();

</script>

<template>
  <header class="ly_header bl_header">
    <div class="ly_header_inner">
      <div class="el_logo">楽天トラベル</div>
      <div class="ly_actions">
        <AButton v-if="token" label="ログアウト" @click="signOut()" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.ly_header {
  &_inner {
    display: flex;
  }
}
</style>
