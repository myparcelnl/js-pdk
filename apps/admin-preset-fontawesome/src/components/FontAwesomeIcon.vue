<template>
  <span
    v-if="faIcon"
    v-test="[AdminComponent.Icon, icon]"
    :class="faIcon"
    role="none" />
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {AdminComponent, type AdminIcon} from '@myparcel-pdk/admin';
import {convertToFontAwesomeIcon} from '../convertToFontAwesomeIcon';

const props = defineProps({
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});

const faIcon = computed(() => convertToFontAwesomeIcon(props.icon));
</script>
