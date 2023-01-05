import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DemoRow',
  props: {
    collapseGutters: {
      type: Boolean,
    },
    columns: {
      type: Number,
      default: null,
    },
  },
  render() {
    const classes = [
      this.$attrs.class,
      'grid',
      this.collapseGutters ? '' : 'gap-4',
      this.columns ? `grid-cols-${this.columns}` : 'grid-cols-auto',
    ];

    return h('div', {...this.$attrs, class: classes}, this.$slots);
  },
});
