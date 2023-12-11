<template>
  <div v-if="deliveryOptions">
    <span :class="config.cssUtilities?.displayFlex">
      <CarrierLogo
        v-if="carrier"
        :carrier="carrier" />

      <template v-if="carrier">&nbsp;&nbsp;</template>

      <ul :class="config.cssUtilities?.marginYAuto">
        <li>
          <DeliveryOptionsPackageType :delivery-options="deliveryOptions" />
        </li>

        <li v-if="deliveryOptions.packageType === PackageTypeName.DigitalStamp">
          <DigitalStampWeightRange :weight-range="dpzRangeWeight" />
        </li>

        <li>
          <DeliveryOptionsDeliveryType :delivery-options="deliveryOptions" />
        </li>

        <li v-if="deliveryOptions.date">
          <DateRelative :date="deliveryOptions.date" />
        </li>
      </ul>
    </span>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {useFetchCarrier} from '../../sdk';
import {useAdminConfig, useOrderData} from '../../composables';
import DeliveryOptionsPackageType from './DeliveryOptionsPackageType.vue';
import DeliveryOptionsDeliveryType from './DeliveryOptionsDeliveryType.vue';
import DateRelative from './DateRelative.vue';
import CarrierLogo from './CarrierLogo.vue';
import {PackageTypeName} from '@myparcel/constants';
import {getDigitalStampRange} from '../../forms/helpers/getDigitalStampRange';
import DigitalStampWeightRange from './DigitalStampWeightRange.vue';

const {query} = useOrderData();

const deliveryOptions = computed(() => get(query.data)?.deliveryOptions);

const carrier = computed(() => {
  const carriersQuery = useFetchCarrier(deliveryOptions.value?.carrier?.name);

  return get(carriersQuery.data);
});

const dpzRangeWeight = getDigitalStampRange();
const config = useAdminConfig();
</script>
