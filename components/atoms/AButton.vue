<script lang="ts">
type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "outline-primary"
  | "outline-secondary"
  | "outline-tertiary"
  | "outline-danger";

type Size = "xlg" | "lg" | "md" | "sm";

export default {
  props: {
    /** ボタンに表示するテキスト */
    label: {
      type: String,
      required: true,
    },
    /** ボタンの色とアウトラインの状態 */
    variant: {
      type: String as PropType<Variant>,
      default: () => "primary",
    },
    /** ボタンのサイズ */
    size: {
      type: String as PropType<Size>,
      default: () => "md",
    },
    /** ボタンを細くするか否か */
    dense: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    /** ボタンを丸くするか否か */
    pill: {
      type: Boolean,
      default: () => false,
    },
    /** displayをblockにするか否か */
    block: {
      type: Boolean,
      default: () => false,
    },
    /** ボタンを幅いっぱい（width: 100%）にするか否か */
    full: {
      type: Boolean,
      default: () => false,
    },
    /** クリックの可否 */
    disabled: {
      type: Boolean,
      default: () => false,
    },
    /**
     * アイコンファイルのパス
     * 指定すると左部にアイコンが表示される
     */
    icon: {
      type: String,
    },
    isIconRight: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
    },
  },
  emits: ["click"],
  setup(_, context) {
    const emitClick = () => context.emit("click");

    return {
      emitClick,
    };
  },
};
</script>

<template>
  <button
    type="button"
    class="bl_button"
    :class="[
      { bl_button__outline: /outline/.test(variant) },
      `bl_button__${variant}`,
      `bl_button__${size}`,
      { bl_button__dense: dense },
      { bl_button__pill: pill },
      { bl_button__block: block },
      { bl_button__full: full },
      { bl_button__disabled: disabled },
      { bl_button__loading: loading },
    ]"
    :disabled="disabled"
    @click="emitClick"
  >
    <img
      v-if="icon && !isIconRight"
      class="bl_button_icon"
      :src="icon"
      alt=""
    />
    <span class="bl_button_label">{{ label }}</span>
    <img v-if="icon && isIconRight" :src="icon" alt="" />
    <div v-show="loading" class="bl_button_loadingSpinner">
      <LoadingSpinner size="xxsm" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
$base-font-size: 1;
$base-padding-vertical: 0.625; // font-sizeが16pxの場合に10pxとなる
$base-padding-horizontal: 1.25; // font-sizeが16pxの場合に20pxとなる

/** ベースのpaddingにサイズをかけたものを設定する */
@mixin padding-x($size: $base-font-size) {
  padding-right: $size * $base-padding-horizontal + rem;
  padding-left: $size * $base-padding-horizontal + rem;
}

/** ベースのpaddingにサイズをかけたものを設定する */
@mixin padding-y($size: $base-font-size) {
  padding-top: $size * $base-padding-vertical + rem;
  padding-bottom: $size * $base-padding-vertical + rem;
}

@mixin padding($size: $base-font-size) {
  @include padding-x($size);
  @include padding-y($size);
}

/** borderの設定を共通化 */
@mixin border($color) {
  border: 1px solid $color;
}

/**
 * 角を完全に円形にする
 * ベースのfont-sizeにサイズをかけたものを設定する
 */
@mixin pill($size: $base-font-size) {
  border-radius: $size * $base-padding-vertical + $size + rem;
}

.bl_button {
  $parent: &;
  position: relative;
  box-sizing: border-box;

  // レイアウトの指定
  display: flex;
  align-items: center;
  justify-content: center;
  // base font-size: 16px -> 42px
  height: 2.625rem;
  padding: $base-padding-vertical + rem $base-padding-horizontal + rem;

  // その他表示の指定
  cursor: pointer;

  // ボーダーの指定
  border: 1px solid transparent; // outlineモードでもサイズが変わらないように初期化
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  // テキストの左に表示するアイコン
  &_icon {
    margin-right: 4px;
    margin-left: -4px;
    vertical-align: middle;
  }

  &_label {
    // フォントの指定
    font-size: $base-font-size + rem;
    font-weight: bold;
    color: $color-font-light;
    vertical-align: middle;

    // アニメーション周りの指定
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }

  &:not(#{$parent}__disabled) {
    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }

  // サイズの指定 & 丸みの指定
  &__xlg {
    // 1.6倍のfont-size、paddingになる
    $size: 1.98;
    @include padding($size);

    // base font-size: 16px -> 64px
    height: 4rem;
    font-size: $size + rem;

    &.bl_button__dense {
      @include padding-y(calc($size / 2));
    }

    &.bl_button__pill {
      @include pill($size);
    }
  }
  &__lg {
    // 1.3倍のfont-size、paddingになる
    $size: 1.3;
    @include padding($size);

    // base font-size: 16px -> 48px
    height: 3rem;
    font-size: $size + rem;

    &.bl_button__dense {
      @include padding-y(calc($size / 2));
    }

    &.bl_button__pill {
      @include pill($size);
    }
  }
  &__md {
    &.bl_button__dense {
      @include padding-y(calc(1 / 2));
    }

    &.bl_button__pill {
      @include pill();
    }
  }
  &__sm {
    // 0.8倍のfont-size、paddingになる
    $size: 0.8;
    @include padding($size);

    // base font-size: 16px -> 36px
    height: 2.25rem;
    font-size: $size + rem;

    &.bl_button__dense {
      @include padding-y(calc($size / 2));
    }

    &.bl_button__pill {
      @include pill($size);
    }
  }

  // 色とアウトラインの状態の指定
  &__primary {
    background-color: $color-primary;

    &:not(#{$parent}__disabled) {
      &:hover,
      &:focus {
        background-color: $color-primary;

        #{$parent}_label {
          color: $color-font-light;
        }
      }
    }
  }
  &__secondary {
    background-color: $color-secondary;
  }
  &__tertiary {
    background-color: $color-tertiary;

    #{$parent}_label {
      color: $color-font;
    }
  }
  &__danger {
    background-color: $color-danger;
  }
  &__outline {
    background-color: $color-component-background;

    &:not(#{$parent}__disabled) {
      &:hover,
      &:focus {
        #{$parent}_label {
          color: $color-font-light;
        }
      }
    }
    &-primary {
      color: $color-primary;

      @include border($color-primary);

      &:not(#{$parent}__disabled) {
        &:hover,
        &:focus {
          background-color: $color-primary;
        }
      }

      #{$parent}_label {
        color: $color-primary;
      }
    }
    &-secondary {
      @include border($color-secondary);

      &:not(#{$parent}__disabled) {
        &:hover,
        &:focus {
          background-color: $color-secondary;
        }
      }

      #{$parent}_label {
        color: $color-secondary;
      }
    }
    &-tertiary {
      @include border($color-tertiary);

      &:not(#{$parent}__disabled) {
        &:hover,
        &:focus {
          background-color: $color-tertiary;

          #{$parent}_label {
            color: $color-font;
          }
        }
      }

      #{$parent}_label {
        color: $color-font;
      }
    }
    &-danger {
      @include border($color-danger);

      &:not(#{$parent}__disabled) {
        &:hover,
        &:focus {
          background-color: $color-danger;
        }
      }

      #{$parent}_label {
        color: $color-danger;
      }
    }
  }

  // ブロック表示する場合
  &__block {
    display: block;
  }

  // 幅いっぱいにする場合
  &__full {
    width: 100%;
  }

  // クリック不可の場合
  &__disabled {
    cursor: default;
    opacity: 0.4;
  }

  &_loadingSpinner {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  // ローディング中
  &__loading {
    #{$parent}_label {
      opacity: 0;
    }

    #{$parent}_loadingSpinner {
      opacity: 1;
    }
  }
}
</style>
