import { useTravelApi } from "/composables/useTravelApi";
import { areaModel, areasModel, areasResponse } from '/tests/factory/useTravelApi'
import { vi } from 'vitest';

vi.stubGlobal("useFetch", vi.fn())

const mockGetResponse = vi.fn().mockImplementation(() => {
  return areasModel()
})

describe("useTravelApi", () => {
  const { middleClassCode, getAreaCode } = useTravelApi();

  describe("target: middleClassCode", () => {
    it("初期値: []", () => {
      expect(middleClassCode.value).toEqual([]);
    });

    describe("target: getAreaCode", () => {
      beforeEach(async () => {
        await getAreaCode();
      });

      it("正しいパラメータで1回実行すること", () => {});

      it("repositoriesのレスポンスが正しく格納されていること", () => {
        console.log(mockGetResponse);
        expect(middleClassCode.value[0]).toStrictEqual(areasResponse()[0])
        expect(middleClassCode.value[1]).toStrictEqual(areasResponse()[1])
      })
    });
  });
});

