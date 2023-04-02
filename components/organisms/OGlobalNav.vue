<script lang="ts" setup>
const { signOut } = useAuth();

const { token } = useAuth();
</script>

<template>
  <header class="ly_header bl_header">
    <div class="ly_header_inner">
      <div class="bl_title">楽天トラベル</div>
      <div class="ly_actions">
        <AButton
          v-if="token"
          label="ログアウト"
          variant="tertiary"
          @click="signOut()"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.ly_header {
  background: #00a0e9;

  &_inner {
    display: flex;
    align-items: center;
    padding: 10px 40px;

    .bl_title {
      margin-right: auto;
      font-size: 32px;
      color: $color-font-light;
      font-weight: 700;
    }
  }
}
</style>
