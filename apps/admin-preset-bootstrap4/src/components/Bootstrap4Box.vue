<template>
  <div
    :class="{
      loading: 'text-muted',
    }"
    class="box">
    <div
      v-if="$slots.header"
      class="box-header">
      <!-- Box header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div class="box-body">
      <slot />
    </div>

    <div
      v-if="$slots.footer || actions.length"
      class="box-footer">
      <slot name="footer">
        <ActionButton
          v-for="(action, index) in actions"
          :key="`${index}_${action.id}`"
          :action="action"
          :disabled="loading" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ActionButton, ResolvedAction, useLanguage} from '@myparcel-pdk/frontend-core/src';

defineProps<{
  loading: boolean;
  title: string;
  actions: ResolvedAction[];
}>();

const {translate} = useLanguage();
</script>
