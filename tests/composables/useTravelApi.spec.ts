import { useTravelApi } from "/composables/useTravelApi";
import { vi } from 'vitest';

vi.stubGlobal("useFetch", vi.fn())

const { middleClassCode, getAreaCode } = useTravelApi();

/** repositoryのモック */
// vi.mock("~~/services/repositories", () => {
//   return {
//     getAreaCode: () => "1",
//   };
// });

// describe("useTravelApi", () => {
//   const { middleClassCode, getAreaCode } = useTravelApi();

//   describe("target: middleClassCode", () => {
//     it("初期値: []", () => {
//       expect(middleClassCode.value).toEqual([]);
//     });

//     describe("target: getAreaCode", () => {
//       beforeEach(async () => {
//         await getAreaCode();
//       });

//       it("正しいパラメータで1回実行すること", () => {});
//     });
//   });
// });

