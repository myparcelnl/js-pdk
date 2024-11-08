<template>
  <span
    v-if="faIcon"
    v-test="[AdminComponent.Icon, icon]"
    :class="faIcon"
    role="none" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {AdminComponent, type IconProps} from '@myparcel-pdk/admin';
import {convertToFontAwesomeIcon} from '../convertToFontAwesomeIcon';

const props = defineProps<IconProps>();

const faIcon = computed(() => convertToFontAwesomeIcon(props.icon));
</script>
