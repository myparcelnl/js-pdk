<template>
  <PdkButton
    v-test="`actionButton--${action?.id}`"
    :size="size"
    :disabled="disabled || action?.disabled"
    :icon="action?.icon"
    :label="!hideText ? action?.label : null"
    :title="hideText ? action?.label : null"
    :aria-label="hideText ? action?.label : null"
    :loading="resolvedAction?.loading"
    @click="onClick" />
</template>

<script setup lang="ts">
import {PropType, computed} from 'vue';
import {ActionDefinition} from '../../types';
import {Size} from '@myparcel-pdk/common/src';
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
    default: Size.MEDIUM,
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
