<template>
  <div v-if="query.data?.deliveryOptions.packageType">
    <PdkIcon :icon="query.data.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(query.data.deliveryOptions.packageType))" />
  </div>
</template>

<script setup lang="ts">
import {useLanguage} from '../../composables';
import {getPackageTypeTranslation} from '../../helpers';
import {useQueryStore} from '../../stores';

const props = defineProps<{shipmentId: number}>();

const query = useQueryStore().registerShipmentQuery(props.shipmentId);

const {translate} = useLanguage();
</script>
