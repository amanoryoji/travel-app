import AButton from "/components/atoms/AButton.vue";
import { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof AButton>;

const meta: Meta<typeof AButton> = {
  title: "atoms/AButton",
  component: AButton,
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: "<AButton v-bind='args' />",
  }),
  args: {
    label: "エラーメッセージです",
  },
  argTypes: {
    onClick: { actions: "clicked" },
  },
};

export const Default: Story = {};

export default meta;
