import AButton from '/components/atoms/AButton.vue';

export default {
  title: 'atoms/AButton',
  component: AButton,
  argTypes: { click: { action: 'click' } }
};

const Template = (args: { status: string }) => ({
  components: { AButton },
  setup() {
    return args;
  },
  template: `<AButton v-bind="args">{{status}}</AButton> `
});

export const All = Template.bind({});
All.args = {
  status: '全て'
};
