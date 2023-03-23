<script lang="ts">
import { computed, PropType } from "vue";
import AErrorMessage from "~/components/atoms/AErrorMessage.vue";

type Value = string | number | null;
type Size = "sm" | "md";

export type Option = {
  label: string;
  value: Value;
};

export default {
  name: "BaseSelect",
  props: {
    /** 選択肢 */
    options: {
      type: Array as PropType<Array<Option>>,
      default: () => [],
    },
    /**
     * 入力欄にバインドする値
     * 親から.sync修飾子で値を渡すことで値の変更を反映させる
     * */
    value: {
      type: [String, Number, null] as PropType<Value>,
      default: () => null,
    },
    /** フォントサイズ */
    size: {
      type: String as PropType<Size>,
      default: "md",
    },
    /** valueをnumber型として格納するか否か */
    // NOTE:選択肢の値はstring型になるため、number型として扱いたいものはtrueにする
    isNumber: {
      type: Boolean,
      default: () => false,
    },
    /** 入力欄を幅いっぱい（width: 100%）にするか否か */
    block: {
      type: Boolean,
      default: () => false,
    },
    /** 選択肢を太字にするか否か */
    bold: {
      type: Boolean,
      default: () => false,
    },
    /** セレクトボックスのアクティベート */
    disabled: {
      type: Boolean,
      default: () => false,
    },
    /** 下部に表示するエラーメッセージ */
    errorMessage: {
      type: String,
    },
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    // NOTE: option.valueとvalueで型が違うと比較できない
    const formattedOptions = computed(() =>
      props.options.map((option: Option): Option => {
        return {
          label: option.label,
          value: option.value !== null ? option.value + "" : option.value,
        };
      })
    );

    const formattedValue = computed(() =>
      props.value !== null ? props.value + "" : props.value
    );

    const handleChange = (v: Value) => {
      let newValue;

      if (props.isNumber) {
        newValue = v !== "" ? Number(v) : null;
      } else {
        newValue = v;
      }

      emit("change", newValue);
      emit("update:modelValue", newValue);
    };

    return {
      formattedOptions,
      formattedValue,
      handleChange,
    };
  },
};
</script>

<template>
  <div
    class="ly_selectWrapper el_selectWrapper"
    :class="[
      { el_selectWrapper__block: block },
      { el_selectWrapper__error: errorMessage },
    ]"
  >
    <select
      class="el_select"
      :class="[{ el_select__bold: bold }, `el_select__${size}`]"
      :disabled="disabled"
      @change="handleChange($event.target.value)"
    >
      <option value="" selected hidden>選択してください</option>
      <option
        v-for="(option, index) in formattedOptions"
        :key="`${option.value}-${index}`"
        :value="option.value"
        :selected="option.value === formattedValue"
      >
        {{ option.label }}
      </option>
    </select>
    <AErrorMessage
      :message="errorMessage"
      font-size="sm"
      class="ly_errorMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
.el_selectWrapper {
  position: relative;
  // レイアウトの設定
  display: inline-block;

  // サイズの設定
  height: 1.875rem;

  // その他の表示の設定
  font-size: 1.25rem;
  border-bottom: 1px solid $color-input;

  // 幅いっぱいにする場合
  &__block {
    width: 100%;
  }

  &__error {
    border-bottom-color: $color-warning;
  }

  // 矢印
  &::after {
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 0.375rem;
    height: 0.375rem;
    margin-top: -0.25rem;
    font-size: 0.8rem;
    pointer-events: none;
    content: "\25BC";
    transform: scaleY(0.5) scaleX(1);
  }
}

.el_select {
  display: inline-block;
  width: 100%;
  height: 100%;

  // サイズの設定
  padding: 0.25rem 2rem 0.25rem 0.25rem;

  // その他の表示の設定
  background-color: $color-component-background;
  border: none;

  &:focus {
    background-color: rgba($color-input, 0.2);
  }

  &__bold {
    font-weight: bold;
  }

  &__md {
    font-size: 1.25rem;
  }

  &__sm {
    font-size: 1rem;
  }
}

.ly_errorMessage {
  margin-top: 8px;
  margin-left: 0.25rem;
}
</style>
