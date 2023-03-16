<script lang="ts" setup>
const { signIn } = useAuth();

const userEmail = ref("");
const userPassWord = ref("");

const login = function (userEmail: string, userPassWord: string) {
  signIn(userEmail, userPassWord);
};
</script>

<template>
  <div>
    <p>メールアドレス</p>
    <input v-model="userEmail" type="text" />
    <p>パスワード</p>
    <input v-model="userPassWord" type="text" />
    <button @click="login(userEmail, userPassWord)">ログイン</button>
    <NuxtLink to="/register">新規会員登録はこちら</NuxtLink>
  </div>
</template>
