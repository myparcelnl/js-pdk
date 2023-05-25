<template>
  <PdkButton
    v-test="`actionButton--${action?.id}`"
    :aria-label="hideText ? action?.label : null"
    :disabled="disabled || action?.disabled"
    :icon="action?.icon"
    :label="!hideText ? action?.label : null"
    :loading="loading"
    :size="size"
    :title="hideText ? action?.label : null"
    :variant="variant"
    @click="onClick" />
</template>

<script lang="ts" setup>
import {Size, Variant} from '@myparcel-pdk/common';
import {ActionDefinition} from '../../types';
import {PropType} from 'vue';
import {useActionStore} from '../../stores';
import {useLoading} from '../../composables';

const props = defineProps({
  action: {
    type: Object as PropType<ActionDefinition>,
    required: true,
  },

  disabled: {
    type: Boolean,
  },

  hideText: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },

  variant: {
    type: String as PropType<Variant>,
    default: Variant.Primary,
  },
});

const emit = defineEmits(['click']);

const {loading, setLoading} = useLoading();

const actionStore = useActionStore();

const onClick = async () => {
  emit('click');
  setLoading(true);
  await actionStore.dispatch(props.action.id, props.action.parameters);
  setLoading(false);
};
</script>
