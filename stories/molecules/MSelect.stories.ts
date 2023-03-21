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
    options:[ { label: 1, value: 1}, { label: 2, value: 2}],
  },
  argTypes: {
    onChange: { actions: "change" },
  },
};

export const Default: Story = {};

export default meta;
