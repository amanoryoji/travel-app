<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  middleClassCode,
  smallClassCode,
  detailClassCode,
  getHotel,
  pageCount,
  getAreaCode,
  getLargeCode,
  getMiddleCode,
  getSmallCode,
  getVacantHotel,
  keyWordSearch,
} = useTravelApi();

/** 県の地区コード */
const middleCode = ref("");

/** 市町村の地区コード */
const smallCode = ref("");

/** 細区分コード */
const detailCode = ref("");

/** セレクトボックスのボタンの有効か無効かの確認 */
const isSelectButton = ref(true);

const inputKeyword = ref("");

/** 空室検索API */
const vacantHotel = async function () {
  const targetScrollPosition = document
    .getElementById("scroll")
    ?.getBoundingClientRect();

  router.push({
    path: "/",
    query: {
      middle: middleCode.value,
      small: smallCode.value,
      detail: detailCode.value,
      page: 1,
    },
  });
  await getVacantHotel(middleCode.value, smallCode.value, detailCode.value, 1);
  window.scrollTo({
    top: targetScrollPosition?.top,
    behavior: "smooth",
  });
};

/** ページネーションクリック */
const pagination = async function (link: number) {
  await getVacantHotel(
    middleCode.value,
    smallCode.value,
    detailCode.value,
    link
  );
  router.push({
    path: "/",
    query: {
      middle: middleCode.value,
      small: smallCode.value,
      detail: detailCode.value,
      page: link,
    },
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
  // FIXME:こちらのソースは改善できないかをみる
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
      label="空室ホテル"
      :disabled="isSelectButton"
      @click="vacantHotel"
    />

    <APagination :items="Number(pageCount)" @click="pagination" />

    <ul
      v-for="hotel in getHotel"
      id="scroll"
      :key="hotel.hotel[0].hotelBasicInfo.hotelNo"
    >
      <li>
        <pre>
          {{ hotel }}
        <!-- {{ hotel.hotel[0].hotelBasicInfo }} -->
        </pre>
        <NuxtLink
          :to="{
            path: '/hotel',
            query: { hotelNo: hotel.hotel[0].hotelBasicInfo.hotelNo },
          }"
          >詳細へ</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
