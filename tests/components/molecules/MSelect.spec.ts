import { VueWrapper, shallowMount } from "@vue/test-utils";

import MSelect from "/components/molecules/MSelect.vue";

describe("BaseTextInput", () => {
  let wrapper: VueWrapper<MSelect>;

  let option: [
    { label: "東京都"; value: "tokyo" },
    { label: "埼玉県"; value: "saitama" }
  ];

  beforeEach(() => {
    wrapper = shallowMount(MSelect);
  });

  it("コンポーネントがマウントされる", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  describe("スナップショット", () => {
    it("デフォルト値", () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("全propを指定", async () => {
      await wrapper.setProps({
        options: option,
        value: "tokyo",
        size: "md",
        isNumber: true,
        block: true,
        bold: false,
        disabled: false,
        errorMessage: "errorMessage",
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
