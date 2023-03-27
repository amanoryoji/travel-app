<script lang="ts" setup>
const { isLoginAlert, signUp } = useAuth();

const userEmail = ref("");
const userPassWord = ref("");

const register = async function (userEmail: string, userPassWord: string) {
  await signUp(userEmail, userPassWord);
};
</script>

<template>
  <form method="post" class="bl_form">
    <div class="bl_form_body">
      <p class="bl_form_title">新規会員登録</p>
      <div class="bl_form_row">
        <p class="bl_form_text">メールアドレス</p>
        <MTextInput
          :model-value="userEmail"
          type="text"
          error-message="エラーメッセージです"
          class="bl_form_input"
          @update:model-value="(newValue) => (userEmail = newValue)"
        />
      </div>
      <div class="bl_form_row">
        <p class="bl_form_text">パスワード</p>
        <MTextInput
          :model-value="userPassWord"
          type="password"
          error-message="エラーメッセージです"
          class="bl_form_input"
          @update:model-value="(newValue) => (userPassWord = newValue)"
        />
      </div>
      <AButton
        type="button"
        label="会員登録をする"
        class="bl_form_submit"
        pill
        full
        @click="register(userEmail, userPassWord)"
      />
      <p v-if="isLoginAlert" class="bl_form_alert">
        登録できません。<br />メールアドレス・パスワードをご確認ください
      </p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.bl_form {
  &_body {
    max-width: 400px;
    margin: 50px auto;
    background-color: $color-component-background;
    box-shadow: 0 2px 5px #ccc;
    border-radius: 5px;
    padding: 20px;

    .bl_form_title {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }

    .bl_form_row {
      margin-bottom: 20px;

      .bl_form_text {
        margin-bottom: 5px;
        color: #95a5a6;
        font-size: 14px;
      }
    }

    .bl_form_alert {
      margin-bottom: 10px;
      color: $color-danger;
    }

    .bl_form_submit {
      padding: 15px 0;
      margin-bottom: 10px;
    }
  }
}
</style>
