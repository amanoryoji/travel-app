<script lang="ts" setup>
const { signUp } = useAuth();

const userEmail = ref("");
const userPassWord = ref("");

const register = function () {
  signUp("", "");
};
</script>

<template>
  <div>
    <button @click="register">新規会員登録</button>
  </div>
</template>
