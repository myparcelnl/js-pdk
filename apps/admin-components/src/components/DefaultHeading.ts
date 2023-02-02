import {defineComponent, h} from 'vue';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const headingLevelValidator: (level: number) => boolean = (level: number) => level >= 1 && level <= 6;

export default defineComponent({
  name: 'DefaultHeading',
  props: {
    level: {
      type: [Number, String],
      default: 1,
      validator: headingLevelValidator,
    },
  },

  render() {
    return h(`h${this.level}`, {}, this.$slots);
  },
});
