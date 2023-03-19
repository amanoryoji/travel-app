import { VueWrapper, shallowMount } from "@vue/test-utils";

import MTextInput from "/components/molecules/MTextInput.vue";


describe("BaseTextInput", () => {
  let wrapper: VueWrapper<MTextInput>;
  beforeEach(() => {
    wrapper = shallowMount(MTextInput);
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
        type: "text",
        value: "abc123",
        placeholder: "myPlaceholder",
        pattern: "^[0-9A-Za-z]+$",
        block: true,
        errorMessage: "errorMessage",
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    describe("type", () => {
      it("text", async () => {
        await wrapper.setProps({ type: "text" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("number", async () => {
        await wrapper.setProps({ type: "number" });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });
  });
});
