<template>
  <span
    v-if="dashIcon"
    v-test="[AdminComponent.Icon, icon]"
    :class="`dashicons-${dashIcon}`"
    class="dashicons"
    role="none" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {AdminComponent, type IconProps} from '@myparcel-pdk/admin';
import {convertToDashIcon} from '../convertToDashIcon';

const props = defineProps<IconProps>();

const dashIcon = computed(() => convertToDashIcon(props.icon));
</script>
