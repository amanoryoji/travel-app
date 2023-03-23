import MSelect from "/components/molecules/MSelect.vue";
import { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof MSelect>;

const meta: Meta<typeof MSelect> = {
  title: "molecules/MSelect",
  component: MSelect,
  render: (args) => ({
    components: { MSelect },
    setup() {
      return { args };
    },
    template: "<MSelect v-bind='args' />",
  }),
  args: {
    options:[
      { label: "東京都", value: "tokyo"},
      { label: "埼玉県", value: "saitama"}],
  },
  argTypes: {
    onChange: { actions: "change" },
    updateModelValue: {actions: "updateModalValue"}
  },
};

export const Default: Story = {};

export default meta;
