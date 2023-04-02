<script lang="ts">
import { PropType } from "vue";
import { Variant } from "~~/types/components";

export default {
  props: {
    modelValue: {
      type: String,
    },
    buttonLabel: {
      type: String,
    },
    buttonVariant: {
      type: Object as PropType<Variant>,
    },
    placeholder: {
      type: String,
    },
  },
  emits: ["update:modelValue", "submit"],
  setup(_, { emit }) {
    const value = ref("");
    const submit = () => emit("submit", value.value);

    return {
      submit,
      value
    };
  },
};
</script>

<template>
  <div class="bl_formText">
    <MTextInput
      :model-value="value"
      type="text"
      placeholder="キーワードを入力ください"
      error-message="エラーメッセージです"
      @update:model-value="(newValue) => (value = newValue)"
    />
    <AButton
      :variant="buttonVariant"
      size="sm"
      :label="buttonLabel"
      @click="submit"
    />
  </div>
</template>

<style lang="scss" scoped>
.bl_formText {
  display: flex;

  &_form {
    height: 100%;
    margin-right: 15px;
  }
}
</style>
