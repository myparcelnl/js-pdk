<template>
  <PdkButton
    v-test="[$.type.__name, action?.id]"
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
import {type ActionDefinition} from '../../types';
import {useActionStore} from '../../stores';
import {useLoading} from '../../composables';

const props = withDefaults(
  defineProps<{
    action: ActionDefinition;
    disabled?: boolean;
    hideText?: boolean;
    size?: Size;
    variant?: Variant;
  }>(),
  {
    size: () => Size.Medium,
    variant: () => Variant.Primary,
  },
);

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
