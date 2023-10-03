<template>
  <PdkImage
    :alt="carrier.human"
    :src="useAssetUrl(carrier.meta.logo_svg)"
    :title="carrier.human"
    width="20" />
</template>

<script lang="ts" setup>
import {type Carrier} from '@myparcel/sdk';
import {useAssetUrl} from '../../composables';

defineProps<{
  carrier: Carrier;
}>();
</script>
