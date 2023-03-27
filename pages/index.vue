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

watch(middleCode, (_, oldVal) => {
  getMiddleCode(middleCode.value);
  if (oldVal) {
    smallCode.value = "";
    isSelectButton.value = true;
  }
});

watch(smallCode, async (_, oldVal) => {
  await getSmallCode(middleCode.value, smallCode.value);
  if (oldVal) {
    detailCode.value = "";
  }
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

const onMountTravel = async function () {
  if (
    router.currentRoute.value.query.middle &&
    router.currentRoute.value.query.small
  ) {
    middleCode.value = router.currentRoute.value.query.middle as string;
    smallCode.value = router.currentRoute.value.query.small as string;
    detailCode.value = router.currentRoute.value.query.detail as string;

    await getVacantHotel(
      middleCode.value,
      smallCode.value,
      detailCode.value,
      Number(router.currentRoute.value.query.page)
    );
  }
  isSelectButton.value = false;
};

onMounted(async () => {
  await getAreaCode();
  getLargeCode();
  onMountTravel();
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
      @update:model-value="(newValue) => (smallCode = newValue)"
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

    <ul id="scroll" class="bl_cardUnit" style="display: flex; flex-wrap: wrap">
      <li
        v-for="hotel in getHotel"
        :key="hotel.hotel[0].hotelBasicInfo.hotelNo"
        class="bl_card"
        style="display: flex"
      >
        <div class="bl_card_img" style="width: 50%">
          <figure class="bl_card_imgWrapper">
            <img
              :src="hotel.hotel[0].hotelBasicInfo.hotelImageUrl"
              :alt="hotel.hotel[0].hotelBasicInfo.hotelName"
              style="width: 100%; height: auto"
            />
          </figure>
        </div>
        <div class="bl_card_body">
          <h3 class="bl_card_title">
            {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
          </h3>
          <p class="bl_card_text">
            {{ hotel.hotel[0].hotelBasicInfo.hotelSpecial }}
          </p>
          <div class="bl_card_price">
            最低料金：
            {{ hotel.hotel[0].hotelBasicInfo.hotelMinCharge }} ~
          </div>
          <div class="bl_card_review">
            レビュー平均：
            {{ hotel.hotel[0].hotelBasicInfo.reviewAverage }}
          </div>
          <NuxtLink
            :to="{
              path: '/hotel',
              query: { hotelNo: hotel.hotel[0].hotelBasicInfo.hotelNo },
            }"
            class="bl_card_link"
            >詳細へ</NuxtLink
          >
        </div>
      </li>
    </ul>
  </div>
</template>
