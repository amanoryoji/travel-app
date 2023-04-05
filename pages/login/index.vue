<script lang="ts" setup>
const { signIn } = useAuth();

const userEmail = ref("");
const userPassWord = ref("");
const loading = ref(false);

const login = function (userEmail: string, userPassWord: string) {
  loading.value = true;
  signIn(userEmail, userPassWord);
};
</script>

<template>
  <div>
    <p>メールアドレス</p>
    <MTextInput
      :model-value="userEmail"
      type="text"
      placeholder="info@hoge.tld"
      error-message="エラーメッセージです"
      @update:model-value="(newValue) => (userEmail = newValue)"
    />
    <p>パスワード</p>
    <MTextInput
      :model-value="userPassWord"
      type="password"
      placeholder="****"
      error-message="エラーメッセージです"
      @update:model-value="(newValue) => (userPassWord = newValue)"
      @keydown="login(userEmail, userPassWord)"
    />
    <AButton
      label="ログイン"
      :loading="loading"
      @click="login(userEmail, userPassWord)"
    />
    <NuxtLink to="/register">新規会員登録はこちら</NuxtLink>
  </div>
</template>
