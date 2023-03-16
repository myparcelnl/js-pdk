<template>
  <div v-if="query.data?.deliveryOptions.packageType">
    <PdkIcon :icon="query.data.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(query.data.deliveryOptions.packageType))" />
  </div>
</template>

<script setup lang="ts">
import {useLanguage, useShipment} from '../../composables';
import {getPackageTypeTranslation} from '../../helpers';

const props = defineProps<{shipmentId: number}>();

const {translate} = useLanguage();

const query = useShipment(props.shipmentId);
</script>
