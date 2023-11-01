<template>
  <Component
    :is="component"
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
import {type Component} from 'vue';
import {Size, Variant} from '@myparcel-pdk/common';
import {prefixComponent} from '../../utils';
import {type ActionDefinition} from '../../types';
import {useActionStore} from '../../stores';
import {AdminComponent} from '../../data';
import {useLoading} from '../../composables';

const props = withDefaults(
  defineProps<{
    component?: string | Component;
    action: ActionDefinition;
    disabled?: boolean;
    hideText?: boolean;
    size?: Size;
    variant?: Variant;
  }>(),
  {
    component: () => prefixComponent(AdminComponent.Button),
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
