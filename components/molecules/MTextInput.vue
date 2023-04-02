<script lang="ts">
import { computed, PropType } from "vue";
export default {
  props: {
    /** 入力欄の種類 */
    type: {
      type: String as PropType<"text" | "number" | "password">,
      default: () => "text",
    },
    /** 入力欄にバインドする値 */
    modelValue: {
      type: [String, Number],
      default: () => "",
    },
    /** プレースホルダーの値 */
    placeholder: {
      type: String,
      default: () => "",
    },
    /** 入力パターン */
    pattern: {
      type: String,
    },
    /** 入力欄を幅いっぱい（width: 100%）にするか否か */
    block: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    /** 下部に表示するエラーメッセージ */
    errorMessage: {
      type: String,
    },
  },
  emits: ["update:modelValue", "focus", "blur", "change", "keydown"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        // 数値型なら数値に変更
        const value = props.type === "number" ? Number(newValue) : newValue;
        emit("update:modelValue", value);
      },
    });

    return {
      model,
    };
  },
};
</script>

<template>
  <div class="ly_textInputWrapper">
    <input
      :value="model"
      class="el_textInput"
      :type="type"
      :placeholder="placeholder"
      :pattern="pattern"
      :class="[
        { el_textInput__block: block },
        { el_textInput__error: !modelValue },
      ]"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('change', $event.target.value)"
      @keydown.enter="$emit('keydown')"
    />
    <AErrorMessage
      :message="errorMessage"
      font-size="sm"
      class="ly_errorMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
.ly_textInputWrapper {
  display: flex;
  flex-direction: column;
}

.el_textInput {
  display: inline-block;
  height: 1.875rem;
  padding: 0.25rem;
  font-size: 1.25rem;
  border: none;
  border-bottom: 1px solid $color-input;

  &:focus {
    background-color: rgba($color-input, 0.2);
  }

  &::placeholder {
    color: $color-black-25;
  }

  // 幅いっぱいにする場合
  &__block {
    width: 100%;
    height: 100%;
  }

  &__error {
    border-bottom-color: $color-warning;
  }
}

.ly_errorMessage {
  margin-top: 8px;
  margin-left: 0.25rem;
}
</style>
