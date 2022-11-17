<template>
  <i
    :class="`icon-${icon}`"
    class="icon"></i>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const ICONS: string[] = [
  'add',
  'save',
  'delete',
  'edit',
  'close',
  'arrow-down',
  'arrow-up',
  'arrow-left',
  'arrow-right',
];

/**
 * A simple icon component.
 */
export default defineComponent({
  name: 'DefaultPdkIcon',
  props: {
    /**
     * @example
     *  Possible values:
     *   - `add`
     *   - `save`
     *   - `delete`
     *   - `edit`
     *   - `close`
     *   - `arrow-down`
     *   - `arrow-up`
     *   - `arrow-left`
     *   - `arrow-right`
     */
    icon: {
      type: String,
      required: true,
      validator: (value: string) => ICONS.includes(value),
    },
  },
});
</script>
