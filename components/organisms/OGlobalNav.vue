<script lang="ts" setup>
const { signOut } = useAuth();

const { token } = useAuth();

/** ログアウト */
const logout = function () {
  signOut();
};
</script>

<template>
  <div>
    <p>楽天トラベル</p>
    <AButton v-if="token" label="ログアウト" @click="logout" />
  </div>
</template>
