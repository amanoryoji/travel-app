<script lang="ts" setup>
import { onMounted, watch } from "vue";

const { signOut } = useAuth();

const large = ref("");
const middle = ref("");
const small = ref("");

const {
  largeClassCode,
  middleClassCode1,
  smallClassCode,
  getAreaCode,
  getLargeCode,
  getMiddleCode,
  getSmallCode,
  vacant,
  keyWordSearch,
} = useTravelApi();

/** ログアウト */
const logout = function () {
  signOut();
};

/** 空室検索API */
const vacantHotelclick = function () {
  vacant(large.value, middle.value, small.value);
};

/** キーワード検索API */
const keyWordSearch1 = function () {
  keyWordSearch();
};

watch(large, () => {
  getMiddleCode(large.value);
  middle.value = "";
});

watch(middle, () => {
  getSmallCode(large.value, middle.value);
  small.value = "";
});

onMounted(async () => {
  await getAreaCode();
  await getLargeCode();
});
</script>

<template>
  <div>
    <MTextInput error-message="エラーメッセージです" />
    <AButton label="ログアウト" @click="logout" />

    <button @click="vacantHotelclick">空室ホテル</button>

    <button @click="keyWordSearch1">キーワード</button>

    <MSelect
      :options="largeClassCode"
      :value="large"
      @change="
        (val) => {
          large = val;
        }
      "
    />

    <MSelect
      :options="middleClassCode1"
      :value="middle"
      :disabled="!large"
      @change="
        (val) => {
          middle = val;
        }
      "
    />

    <MSelect
      :options="smallClassCode"
      :value="small"
      :disabled="smallClassCode.length > 0 ? false : true"
      @change="
        (val) => {
          small = val;
        }
      "
    />
  </div>
</template>
