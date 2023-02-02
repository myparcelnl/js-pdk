/* eslint-disable @typescript-eslint/naming-convention */
import {defineComponent, h} from 'vue';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultRow
 */
export default defineComponent({
  name: 'Bootstrap4Row',
  props: {
    collapseGutters: {
      type: Boolean,
    },
    columns: {
      type: [Number, String],
      default: null,
    },
  },

  render() {
    const classes = [
      this.$attrs.class,
      this.columns ? `row-cols-${this.columns}` : 'row',
      this.collapseGutters ? 'no-gutters' : '',
    ];

    return h('div', {...this.$attrs, class: classes}, this.$slots);
  },
});
