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

/** キーワード検索用変数 */
const inputKeyword = ref("");

/** 検索ボタンをクリックした際にスクロールするようにする */
const targetScrollPosition = document
  .getElementById("bl_result")
  ?.getBoundingClientRect();

/** キーワード検索 */
const keyWordInput = async function (inputKeyword: string) {
  router.push({
    path: "/",
    query: {
      keyword: inputKeyword,
      page: 1,
    },
  });
  await keyWordSearch(inputKeyword, 1);
};

/** 空室検索API */
const vacantHotel = async function () {
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
  if (
    router.currentRoute.value.query.middle &&
    router.currentRoute.value.query.small
  ) {
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
  } else if (router.currentRoute.value.query.keyword) {
    await keyWordSearch(inputKeyword.value, link);
    router.push({
      path: "/",
      query: {
        keyword: inputKeyword.value,
        page: link,
      },
    });
  }
};

/** 詳細へのリンク */
const detailHotelInfo = function (hotelNo) {
  router.push({
    path: "/hotel",
    query: {
      hotelNo,
    },
  });
};

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
    isSelectButton.value = false;
  } else if (router.currentRoute.value.query.keyword) {
    inputKeyword.value = router.currentRoute.value.query.keyword as string;
    await keyWordSearch(
      inputKeyword.value,
      Number(router.currentRoute.value.query.page)
    );
  }
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

onMounted(async () => {
  await getAreaCode();
  onMountTravel();
});
</script>

<template>
  <div class="ly_container_main">
    <ATextTitle title="全国各地の宿泊施設を検索しましょう！" :bold="true" />
    <p class="bl_text">
      *楽天トラベルに登録されている施設を、キーワード検索か地域毎で検索できます。<br />
      *札幌、東京、名古屋、大阪、京都は詳細エリアも含めて検索ください。
    </p>
    <!-- <OTextInputButton
      class="bl_partners_searchForm"
      button-label="検索"
      @submit="keyWordSearch(inputKeyword)"
    /> -->

    <div class="bl_search">
      <div class="bl_search_input">
        <MTextInput
          :model-value="inputKeyword"
          type="text"
          placeholder="キーワードを入力ください"
          error-message="エラーメッセージです"
          @update:model-value="(newValue) => (inputKeyword = newValue)"
        />
        <AButton
          label="キーワード検索"
          variant="outline-secondary"
          :disabled="!inputKeyword"
          @click="keyWordInput(inputKeyword)"
        />
      </div>

      <div class="bl_search_area">
        <div class="bl_search_select">
          <p class="bl_search_text">都道府県<span>必須</span></p>
          <MSelect
            :options="middleClassCode"
            :value="middleCode"
            @update:model-value="(newValue) => (middleCode = newValue)"
          />
        </div>

        <div class="bl_search_select">
          <p class="bl_search_text">市町村<span>必須</span></p>
          <MSelect
            :options="smallClassCode"
            :value="smallCode"
            :disabled="!middleCode"
            @update:model-value="(newValue) => (smallCode = newValue)"
          />
        </div>

        <div class="bl_search_select">
          <p class="bl_search_text">詳細エリア</p>
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
        </div>
      </div>
      <AButton
        label="空室ホテル"
        :disabled="isSelectButton"
        @click="vacantHotel"
      />
    </div>

    <div id="bl_result" class="bl_result">
      <APagination
        :total="Number(pageCount)"
        :count="Number(router.currentRoute.value.query.page)"
        @decrement="
          pagination(Number(router.currentRoute.value.query.page) - 1)
        "
        @increment="
          pagination(Number(router.currentRoute.value.query.page) + 1)
        "
        @move-page="pagination"
      />

      <ul class="bl_cardUnit">
        <li
          v-for="hotel in getHotel"
          :key="hotel.hotel[0].hotelBasicInfo.hotelNo"
          class="bl_card"
        >
          <div class="bl_card_img">
            <figure class="bl_card_imgWrapper">
              <img
                :src="hotel.hotel[0].hotelBasicInfo.hotelImageUrl"
                :alt="hotel.hotel[0].hotelBasicInfo.hotelName"
                style="width: 100%; height: auto"
              />
            </figure>
          </div>
          <div class="bl_card_body">
            <h3 class="bl_card_list el_name">
              {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
            </h3>
            <p class="bl_card_list el_text">
              {{ hotel.hotel[0].hotelBasicInfo.hotelSpecial }}
            </p>
            <div class="bl_card_list el_price">
              <label class="el_label">最安料金</label>
              {{ hotel.hotel[0].hotelBasicInfo.hotelMinCharge }}円~
            </div>
            <div
              v-if="hotel.hotel[0].hotelBasicInfo.reviewAverage"
              class="bl_card_list el_review"
            >
              レビュー平均：
              {{ hotel.hotel[0].hotelBasicInfo.reviewAverage }}
            </div>
            <AButton
              label="詳細へ"
              variant="outline-secondary"
              :disabled="false"
              @click="detailHotelInfo(hotel.hotel[0].hotelBasicInfo.hotelNo)"
            ></AButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ly_container_main {
  padding: 50px;

  .el_pageTitle{
    margin-bottom: 30px;
  }

  .bl_text{
    margin-bottom: 30px;
  }

  .bl_search {
    &_input {
      display: flex;
      margin-bottom: 30px;

      .ly_textInputWrapper {
        width: 300px;
        margin-right: 20px;
      }
    }

    &_area {
      .bl_search_select {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        .bl_search_text {
          width: 200px;
          margin-right: 20px;
        }
      }
    }
  }

  .bl_result {
    .bl_paginationButton {
      justify-content: center;
    }
    .bl_cardUnit {
      display: flex;
      flex-wrap: wrap;

      .bl_card {
        display: flex;
        margin-bottom: 50px;

        &:last-child {
          margin-bottom: 0;
        }

        &_img {
          width: 50%;
          max-width: 500px;
          margin-right: 2%;

          .bl_card_imgWrapper {
            margin: 0;
          }
        }

        &_body {
          width: 48%;

          .bl_card_list {
            margin-bottom: 20px;
          }

          .el_name {
            font-size: $font-size-base;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
