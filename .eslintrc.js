module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  plugins: ["vue"],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    // scriptタグが複数あってもimportが書けるようにする
    "import/first": "off",
    "import/namespace": "off",
    "import/no-duplicates": "off",
    "import/order": "off",
    "import/named": "off",
    "import/export": "off",
    "vue/require-default-prop": "off",
    // "@typescript-eslint/no-non-null-assertion": "error",
    "no-else-return": "error",
    curly: "error",
    //  ページパスを単一単語とするため許可する
    "vue/multi-word-component-names": "off",
    //  v-model:valueを書けるように許可する
    "vue/no-v-model-argument": "off",
    //  templateの直下に複数要素を書けるように許可する
    "vue/no-multiple-template-root": "off",
    //  sfcのタグ順を指定する
    "vue/component-tags-order": [
      "error",
      { order: ["script", "template", "style"] },
    ],
    //  コンポーネント名はパスカルケース
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      { registeredComponentsOnly: false, ignores: [] },
    ],
    //  templateタグにkeyを書かせない(Vue2ではビルドエラーになる)
    "vue/no-v-for-template-key-on-child": "off",
    "no-useless-constructor": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    // .sync修飾子を使えるようにする(Vue3では廃止になるがBridgeでは使える)
    "vue/no-deprecated-v-bind-sync": "off",
  },
};
