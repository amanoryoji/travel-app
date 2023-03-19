import AErrorMessage from "/components/atoms/AErrorMessage.vue";
import { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof AErrorMessage>;

const meta: Meta<typeof AErrorMessage> = {
  title: "atoms/AErrorMessage",
  component: AErrorMessage,
  render: (args) => ({
    components: { AErrorMessage },
    setup() {
      return { args };
    },
    template: "<AErrorMessage v-bind='args' />",
  }),
  args: {
    message: "エラーメッセージです",
  },
};

export const Default: Story = {};

export default meta;
