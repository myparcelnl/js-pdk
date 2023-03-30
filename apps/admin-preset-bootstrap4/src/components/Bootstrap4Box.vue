<template>
  <div
    :class="{
      'text-muted': loading,
    }"
    class="card">
    <div
      v-if="$slots.header || title"
      class="card-header">
      <!-- Box header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div :class="bodyClass">
      <slot />
    </div>

    <div
      v-if="$slots.footer || actions?.length"
      class="card-footer">
      <slot name="footer">
        <PdkButtonGroup v-if="actions?.length">
          <ActionButton
            v-for="action in actions"
            :key="action.id"
            :action="action" />
        </PdkButtonGroup>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ActionButton, ActionDefinition, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, computed} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },

  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },

  title: {
    type: String,
    default: null,
  },
});

const bodyClass = computed(() => ({
  'card-body': [Size.Medium, Size.Large, Size.ExtraLarge].includes(props.size),
}));

const {translate} = useLanguage();
</script>
