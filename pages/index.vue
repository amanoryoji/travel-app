<script lang="ts" setup>
import { onMounted, watch } from "vue";
// import { useRouter } from "vue-router";

const {
  middleClassCode,
  smallClassCode,
  detailClassCode,
  getAreaCode,
  getLargeCode,
  getMiddleCode,
  getSmallCode,
  getVacantHotel,
  keyWordSearch,
} = useTravelApi();

const inputKeyword = ref("");

/** 県の地区コード */
const middleCode = ref("");

/** 市町村の地区コード */
const smallCode = ref("");

/** 細区分コード */
const detailCode = ref("");

/** セレクトボックスのボタンの有効か無効かの確認 */
const isSelectButton = ref(true);

// const router = useRouter();

/** 空室検索API */
const vacantHotel = async function () {
  // router.push({ path: "yado", props: { message: "propsが渡される" } });
  const targetScrollPosition = document
    .getElementById("scroll")
    ?.getBoundingClientRect();

  await getVacantHotel(middleCode.value, smallCode.value, detailCode.value);
  window.scrollTo({
    top: targetScrollPosition?.top,
    behavior: "smooth",
  });
};

watch(middleCode, () => {
  getMiddleCode(middleCode.value);
  smallCode.value = "";
  isSelectButton.value = true;
});

watch(smallCode, () => {
  getSmallCode(middleCode.value, smallCode.value);
  detailCode.value = "";
  if (
    smallCode.value !== "" &&
    smallCode.value !== "sapporo" &&
    smallCode.value !== "tokyo" &&
    smallCode.value !== "shi" &&
    smallCode.value !== "nagoyashi"
  ) {
    isSelectButton.value = false;
  } else {
    isSelectButton.value = true;
  }
});

watch(detailCode, () => {
  if (detailCode.value) {
    isSelectButton.value = false;
  }
});

onMounted(async () => {
  await getAreaCode();
  getLargeCode();
});
</script>

<template>
  <div>
    <div style="display: flex">
      <MTextInput
        :model-value="inputKeyword"
        type="text"
        placeholder="キーワードを入力ください"
        error-message="エラーメッセージです"
        @update:model-value="(newValue) => (inputKeyword = newValue)"
      />
      <AButton
        label="キーワード検索"
        :disabled="!inputKeyword"
        @click="keyWordSearch(inputKeyword)"
      />
    </div>

    <MSelect
      :options="middleClassCode"
      :value="middleCode"
      @update:model-value="(newValue) => (middleCode = newValue)"
    />

    <MSelect
      :options="smallClassCode"
      :value="smallCode"
      :disabled="!middleCode"
      @change="
        (val) => {
          smallCode = val;
        }
      "
    />

    <MSelect
      :options="detailClassCode"
      :value="detailCode"
      :disabled="!detailClassCode.length"
      @change="
        (val) => {
          detailCode = val;
        }
      "
    />
    <AButton
      style="margin-bottom: 2000px"
      label="空室ホテル"
      :disabled="isSelectButton"
      @click="vacantHotel"
    />

    <div id="scroll">ここまでスクロール</div>
  </div>
</template>
