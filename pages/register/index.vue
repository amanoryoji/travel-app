<script lang="ts" setup>
const { signUp } = useAuth();

const userEmail = ref("");
const userPassWord = ref("");

const register = function () {
  console.log("クリック");
  signUp("test121@gmail.com", "test1111");
};
</script>

<template>
  <div>
    <AButton label="新規会員登録" @click="register" />
  </div>
</template>
