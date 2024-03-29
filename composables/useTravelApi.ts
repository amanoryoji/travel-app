import axios from "axios";

type areaCode = {
  label: string;
  value: string;
};

export const useTravelApi = () => {
  const middleClassCode: Ref<areaCode[]> = ref([]);
  const smallClassCode: Ref<areaCode[]> = ref([]);
  const detailClassCode: Ref<areaCode[]> = ref([]);

  const getAreaResponse: Ref<any[]> = ref([]);

  const getHotel = ref([]);

  const pageCount = ref("");

  /** 地区コード取得 */
  async function getAreaCode() {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            formatVersion: 2,
          },
        }
      )
      .then((response) => {
        getAreaResponse.value =
          response.data.areaClasses.largeClasses[0][1].middleClasses;
      });
  }

  /** 県取得 */
  function getLargeCode() {
    middleClassCode.value = getAreaResponse.value.map((middleClass) => {
      return {
        label: middleClass.middleClass[0].middleClassName,
        value: middleClass.middleClass[0].middleClassCode,
      };
    });
  }

  /** セレクトボックスで選択された県の詳細情報を取得 */
  function getEqualMiddleCode(middle: string) {
    const res = getAreaResponse.value.filter((middleClass) => {
      return middleClass.middleClass[0].middleClassCode === middle;
    });
    return res;
  }

  /** 市町村取得 */
  function getMiddleCode(middle: string) {
    const res = getEqualMiddleCode(middle);

    smallClassCode.value = res[0].middleClass[1].smallClasses.map((res) => {
      return {
        label: res.smallClass[0].smallClassName,
        value: res.smallClass[0].smallClassCode,
      };
    });
  }

  /** 細区分取得 */
  function getSmallCode(middle: string, small: string) {
    const res = getEqualMiddleCode(middle);

    const res1 = res[0].middleClass[1].smallClasses.filter((res) => {
      return res.smallClass.length > 1;
    });

    if (res1.length > 0) {
      if (res1[0].smallClass[0].smallClassCode === small) {
        const res1 = res[0].middleClass[1].smallClasses
          .filter((res) => {
            return res.smallClass[1];
          })
          .map((res) => {
            return res.smallClass[1].detailClasses;
          });
        if (res1.length) {
          detailClassCode.value = res1[0].map((res2) => {
            return {
              label: res2.detailClass.detailClassName,
              value: res2.detailClass.detailClassCode,
            };
          });
        }
      } else {
        detailClassCode.value = [];
      }
    } else {
      detailClassCode.value = [];
    }
  }

  /** 空室検索API */
  async function getVacantHotel(
    large: string,
    middle: string,
    small: string,
    page1: number
  ) {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426",
        // "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            largeClassCode: "japan",
            middleClassCode: large,
            smallClassCode: middle,
            detailClassCode: small,
            checkinDate: "2023-04-02",
            checkoutDate: "2023-04-03",
            sort: "standard", // おすすめ順でsortできる
            page: page1,
            hits: 20,
          },
        }
      )
      .then((response) => {
        getHotel.value = response.data.hotels;
        pageCount.value = response.data.pagingInfo.pageCount;
      })
      .catch((error) => {
        alert(error);
      });
  }

  /** キーワード検索API */
  async function keyWordSearch(inputKeyword: string) {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            keyword: inputKeyword,
          },
        }
      )
      .then((response) => {
        getHotel.value = response.data.hotels;
        console.log(response);
      })
      .catch((error) => {
        alert(error);
      });
  }

  /** 詳細ページの空室検索API */
  async function targetVacantHotel(targetHotelNo: number) {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426",
        // "https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            checkinDate: "2023-04-02",
            checkoutDate: "2023-04-03",
            hotelNo: targetHotelNo,
          },
        }
      )
      .then((response) => {
        getHotel.value = response.data.hotels[0].hotel;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  return {
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
    targetVacantHotel,
  };
};
