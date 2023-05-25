<template>
  <div v-if="query.data?.deliveryOptions.packageType">
    <PdkIcon :icon="query.data.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(query.data.deliveryOptions.packageType))" />
  </div>
</template>

<script lang="ts" setup>
import {useQueryStore} from '../../stores';
import {getPackageTypeTranslation} from '../../helpers';
import {useLanguage} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const query = useQueryStore().registerShipmentQuery(props.shipmentId);

const {translate} = useLanguage();
</script>
