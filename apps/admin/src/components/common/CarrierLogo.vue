<template>
  <PdkImage
    :alt="carrier.human"
    :src="createAssetUrl(carrier.meta.logo_svg)"
    :title="carrier.human"
    width="20" />
</template>

<script lang="ts" setup>
import {type Carrier} from '@myparcel-dev/sdk';
import {createAssetUrl} from '../../utils';

defineProps<{carrier: Carrier}>();
</script>
