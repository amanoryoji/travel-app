import MTextInput from "/components/molecules/MTextInput.vue";
import { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof MTextInput>;

const meta: Meta<typeof MTextInput> = {
  title: "molecules/MTextInput",
  component: MTextInput,
  render: (args) => ({
    components: { MTextInput },
    setup() {
      return { args };
    },
    template: "<MTextInput v-bind='args' />",
  }),
  args: {
    type:"text",
    placeholder: "メッセージを入力ください",
    errorMessage: 'エラーメッセージです'
  },
  argTypes: {
    onBlur: { actions: "onBlur" },
    onFocus: { actions: "focus" },
    onChange: { actions: "onChange" },

  },
};

export const Default: Story = {};

export default meta;
