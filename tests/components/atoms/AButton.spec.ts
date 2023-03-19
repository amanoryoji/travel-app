import { VueWrapper, shallowMount } from "@vue/test-utils";

import AButton from "/components/atoms/AButton.vue";


describe("AButton", () => {
  let wrapper: VueWrapper<AButton>;
  beforeEach(() => {
    wrapper = shallowMount(AButton, {
      propsData: {
        label: "ボタン名",
      },
    });
  });

  it("コンポーネントがマウントされる", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("labelの名前がボタン名になっている", () => {
    expect(wrapper.props().label).toBe('ボタン名')
  });

  describe("スナップショット", () => {
    it("必須Propのみ", () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("全Prop指定", async () => {
      await wrapper.setProps({
        variant: "seconcary",
        size: "lg",
        pill: true,
        block: true,
        full: true,
        disabled: true,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    describe("variant", () => {
      it("primary", async () => {
        await wrapper.setProps({ size: "primary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
      it("secondary", async () => {
        await wrapper.setProps({ size: "secondary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
      it("tertiary", async () => {
        await wrapper.setProps({ size: "tertiary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
      it("outline-primary", async () => {
        await wrapper.setProps({ size: "outline-primary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
      it("outline-secondary", async () => {
        await wrapper.setProps({ size: "outline-secondary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
      it("outline-tertiary", async () => {
        await wrapper.setProps({ size: "outline-tertiary" });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    describe("size", () => {
      it("sm", async () => {
        await wrapper.setProps({ size: "sm" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("md", async () => {
        await wrapper.setProps({ size: "md" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("lg", async () => {
        await wrapper.setProps({ size: "lg" });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    describe("icon", () => {
      it("not found", async () => {
        await wrapper.setProps({ icon: "/path_to_image" });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("account_circle", async () => {
        await wrapper.setProps({ icon: "/images/icon/account_circle.svg" });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    describe("isIconRight", () => {
      it("false", async () => {
        await wrapper.setProps({
          icon: "/images/icon/account_circle.svg",
          isIconRight: false,
        });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it("true", async () => {
        await wrapper.setProps({
          icon: "/images/icon/account_circle.svg",
          isIconRight: true,
        });
        expect(wrapper.html()).toMatchSnapshot();
      });
    });
  });
});
