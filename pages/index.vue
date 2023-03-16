<script lang="ts" setup>
const { signOut } = useAuth();

const logout = function () {
  signOut();
};
</script>

<template>
  <div>
    <MTextInput error-message="エラーメッセージです" />
    <AButton status="ログアウト" @click="logout" />
    <NuxtLink to="/register">新規会員登録はこちら</NuxtLink>
  </div>
</template>
