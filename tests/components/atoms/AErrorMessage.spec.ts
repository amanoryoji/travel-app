import { VueWrapper, shallowMount } from "@vue/test-utils";

import AErrorMessage from "/components/atoms/AErrorMessage.vue";


describe("ErrorMessage", () => {
  let wrapper: VueWrapper<AErrorMessage>;
  beforeEach(() => {
    wrapper = shallowMount(AErrorMessage);
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
        message: "myMessag",
        fontSize: "lg",
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    describe("fontSize", () => {
      it("sm", async () => {
        await wrapper.setProps({ fontSize: "sm" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("md", async () => {
        await wrapper.setProps({ fontSize: "md" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("lg", async () => {
        await wrapper.setProps({ fontSize: "lg" });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });
  });
});
