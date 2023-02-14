<template>
  <ul>
    <template
      v-for="day in weekdays"
      :key="day">
      <li>
        <span>{{ translate(day) }}</span>

        <PdkToggleInput
          v-model="toggleRefs[day]"
          :element="toggleElements[day]" />

        <div v-if="toggleRefs[day]">
          <PdkTimeInput
            v-model="cutOffRefs[day]"
            :element="element" />
        </div>

      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import {ElementInstance, createFormElement, useLanguage} from '@myparcel-pdk/frontend-core/src';
import { PropType, defineComponent, reactive, ref, Prop, computed } from 'vue';
import { Shipment } from '@myparcel-pdk/common';

/**
 * This component is used to render drop-off and cutoff settings.
 */
export default defineComponent({
  name: 'DefaultDropOffInput',

  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Object as PropType<Shipment.ModelDropOffDay>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: () => {
    const weekdays = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    const {translate} = useLanguage();

    const toggleRefs = reactive(weekdays.reduce((acc, day) => ({...acc, [day]: ref(undefined)}), {}));

    const cutOffRefs = reactive(weekdays.reduce((acc, day) => ({...acc, [day]: ref(undefined)}), {}));

    const dropOffDaysModel = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    return {
      translate,
      weekdays,

      toggleRefs,

      cutOffRefs,

      toggleElements: weekdays.reduce((acc, day) => {
        return {
          ...acc,
          [day]: createFormElement({
            ref: toggleRefs[day],
            name: day,
          }),
        };
      }, {}),
    };
  },
});
</script>
