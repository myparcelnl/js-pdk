<template>
  <div>
    <ul>
      <template
        v-for="[day, human] in Object.entries(weekdaysObject)"
        :key="day">
        <li>
          <span>{{ human }}</span>

          <PdkToggleInput
            v-model="toggleRefs[day]"
            :element="toggleElements[day]" />

          <div v-if="toggleRefs[day]">
            <PdkTimeInput
              v-model="cutoffRefs[day]"
              :element="cutoffElements[day]" />
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  DEFAULT_VALUE_EMIT,
  ElementInstance,
  useDropOffInputContext,
  useLanguage,
} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {Settings} from '@myparcel-pdk/common/src';

/**
 * This component is used to render drop-off and cutoff settings.
 */
export default defineComponent({
  name: 'DefaultDropOffInput',

  props: {
    // eslint-disable-next-line vue/no-unused-properties
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Object as PropType<Settings.ModelDropOffPossibilities>,
      required: true,
    },
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    const {translate} = useLanguage();
    const {weekdaysObject, cutoffElements, toggleElements, toggleRefs, cutoffRefs} = useDropOffInputContext(
      props.modelValue,
      ctx.emit,
    );

    return {
      translate,
      weekdaysObject,
      toggleRefs,
      cutoffRefs,
      toggleElements: toggleElements,
      cutoffElements: cutoffElements,
    };
  },
});
</script>
