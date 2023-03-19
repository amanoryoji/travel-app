<script lang="ts" setup>
const { signOut } = useAuth();

const logout = function () {
  signOut();
};
</script>

<template>
  <div>
    <MTextInput error-message="エラーメッセージです" />
    <AButton label="ログアウト" @click="logout" />
    <NuxtLink to="/register">新規会員登録はこちら</NuxtLink>
  </div>
</template>
