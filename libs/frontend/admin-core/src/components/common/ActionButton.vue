<template>
  <PdkButton
    v-test="`actionButton--${action?.id}`"
    :aria-label="hideText ? action?.label : null"
    :disabled="disabled || action?.disabled"
    :icon="action?.icon"
    :label="!hideText ? action?.label : null"
    :loading="resolvedAction?.loading"
    :size="size"
    :title="hideText ? action?.label : null"
    :variant="variant"
    @click="onClick" />
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {ActionDefinition} from '../../types';
import {Size} from '@myparcel-pdk/common/src';
import {Variant} from '@myparcel-pdk/common';
import {useActionStore} from '../../stores';

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

const actionStore = useActionStore();

const resolvedAction = computed(() => actionStore.get(props.action.id));

const onClick = () => {
  emit('click');
  actionStore.dispatch(props.action.id, props.action.parameters);
};
</script>
