import axios from "axios";

export const useTravelApi = () => {
  const largeClassCode: Ref<any[]> = ref([]);
  const middleClassCode1: Ref<any[]> = ref([]);
  const smallClassCode: Ref<any[]> = ref([]);

  const getResponse: Ref<any[]> = ref([]);

  /** 地区コード取得 */
  async function getAreaCode() {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
          },
        }
      )
      .then((response) => {
        getResponse.value =
          response.data.areaClasses.largeClasses[0].largeClass[1].middleClasses;
      });
  }

  /** 県取得 */
  function getLargeCode() {
    largeClassCode.value = getResponse.value.map((middleClass) => {
      return {
        label: middleClass.middleClass[0].middleClassName,
        value: middleClass.middleClass[0].middleClassCode,
      };
    });
  }

  /** 市町村取得 */
  function getMiddleCode(middle) {
    const res = getResponse.value.filter((middleClass) => {
      return middleClass.middleClass[0].middleClassCode === middle;
    });

    middleClassCode1.value = res[0].middleClass[1].smallClasses.map((res) => {
      return {
        label: res.smallClass[0].smallClassName,
        value: res.smallClass[0].smallClassCode,
      };
    });
  }

  /** 地区詳細取得 */
  function getSmallCode(middle, small) {
    const res = getResponse.value.filter((middleClass) => {
      return middleClass.middleClass[0].middleClassCode === middle;
    });

    if (
      res &&
      (small === "sapporo" ||
        small === "tokyo" ||
        small === "shi" ||
        small === "nagoyashi")
    ) {
      const res1 = res[0].middleClass[1].smallClasses
        .filter((res) => {
          return res.smallClass[1];
        })
        .map((res) => {
          return res.smallClass[1].detailClasses;
        });
      if (res1.length) {
        smallClassCode.value = res1[0].map((res2) => {
          return {
            label: res2.detailClass.detailClassName,
            value: res2.detailClass.detailClassCode,
          };
        });
      }
    } else {
      smallClassCode.value = [];
    }
  }

  /** 空室検索API */
  async function vacant(large, middle, small) {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            largeClassCode: "japan",
            middleClassCode: large,
            smallClassCode: middle,
            detailClassCode: small,
            sort: "standard", // おすすめ順でsortできる
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
      });
  }

  /** キーワード検索API */
  async function keyWordSearch() {
    await axios
      .get(
        "https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426",
        {
          params: {
            applicationId: "1056638830656016957",
            format: "json",
            keyword: "北海道",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return {
    largeClassCode,
    middleClassCode1,
    smallClassCode,
    getAreaCode,
    getLargeCode,
    getMiddleCode,
    getSmallCode,
    vacant,
    keyWordSearch,
  };
};
