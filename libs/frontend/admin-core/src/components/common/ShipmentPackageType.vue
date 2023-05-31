<template>
  <div v-if="data?.deliveryOptions.packageType">
    <PdkIcon :icon="data.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(data.deliveryOptions.packageType))" />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {useQueryStore} from '../../stores';
import {getPackageTypeTranslation} from '../../helpers';
import {useLanguage} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const query = useQueryStore().registerShipmentQuery(props.shipmentId);

const data = computed(() => get(query.data));

const {translate} = useLanguage();
</script>
