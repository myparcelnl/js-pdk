<template>
  <span
    v-if="faIcon"
    v-test="'Icon'"
    :class="faIcon"
    role="none" />
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-admin-core';
import {convertToFontAwesomeIcon} from '../convertToFontAwesomeIcon';

const props = defineProps({
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});

const faIcon = computed(() => convertToFontAwesomeIcon(props.icon));
</script>
