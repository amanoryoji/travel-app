import { AreaCode } from "/models/travel/areaCode"

/** 地区コード一覧レスポンス */
export const areasResponse = () => {
  return [
    {
      label: "北海道",
      value: "hokkaido",
    },
    {
      label: "青森県",
      value: "aomori",
    },
  ];
};

/** 地域コード一覧モデル */
export const areasModel = () => {
  console.log(areasResponse().map((area) => new AreaCode(area)));
  return areasResponse().map((area) => new AreaCode(area))
}

// export const areasModel = 1;

// /** 地域コードモデル */
export const areaModel = () => {
  console.log(new AreaCode(areasResponse()[0]));
  return new AreaCode(areasResponse()[0])
}
