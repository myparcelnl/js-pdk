<template>
  <span
    v-if="faIcon"
    v-test="AdminComponent.Icon"
    :class="faIcon"
    role="none" />
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {type AdminIcon} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';
import {convertToFontAwesomeIcon} from '../convertToFontAwesomeIcon';

const props = defineProps({
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});

const faIcon = computed(() => convertToFontAwesomeIcon(props.icon));
</script>
