<template>
  <div>
    <PdkFormGroup label="format">
      <PdkRadio
        v-for="item in formatOptions"
        :key="`${item.label}_${item.value}`"
        v-model="format"
        :checked="format === item.value"
        v-bind="item" />
    </PdkFormGroup>
    <PdkFormGroup
      v-show="format === 'a4'"
      label="positions">
      <PdkCheckbox
        v-for="item in positionOptions"
        :key="`${item.label}_${item.value}`"
        v-model="position[item.value]"
        v-bind="item" />
    </PdkFormGroup>
    <PdkFormGroup label="output">
      <PdkRadio
        v-for="item in outputOptions"
        :key="`${item.label}_${item.value}`"
        v-model="output"
        :checked="output === item.value"
        v-bind="item" />
    </PdkFormGroup>
  </div>
</template>

<script lang="ts">
import {ContextKey, LabelFormat, LabelOutput, LabelPosition} from '@myparcel/pdk-frontend-shared';
import {UnwrapRef, defineComponent, reactive, ref} from 'vue';
import {formatOptions, outputOptions, positionOptions, positions} from '../../data/printOptions';
import {useGlobalContext} from '../../composables';

export default defineComponent({
  name: 'PrintOptionsForm',

  setup: () => {
    const {labelFormat, labelPosition, labelOutput} = useGlobalContext(ContextKey.PLUGIN_SETTINGS).value;

    const format = ref<LabelFormat>(labelFormat);
    const position = reactive<UnwrapRef<Partial<Record<LabelPosition, boolean>>>>(
      positions.reduce(
        (acc, val) => ({
          ...acc,
          [val]: labelPosition.includes(val),
        }),
        {},
      ),
    );
    const output = ref<LabelOutput>(labelOutput);

    // watchEffect(() => {
    //   contextData.value.labelFormat = format.value;
    //   contextData.value.labelPosition = positions.filter((K) => position[K]);
    //   contextData.value.labelOutput = output.value;
    // });

    return {
      format,
      position,
      output,
      positionOptions,
      formatOptions,
      outputOptions,
    };
  },
});
</script>
