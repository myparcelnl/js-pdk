<template>
  <div v-if="data && deliveryOptions">
    <span :class="config.cssUtilities?.displayFlex">
      <CarrierLogo
        v-if="carrier"
        :carrier="carrier" />

      <template v-if="carrier">&nbsp;&nbsp;</template>

      <ul :class="config.cssUtilities?.marginYAuto">
        <li>
          <DeliveryOptionsPackageType :shipment-or-order="data" />
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

const {query} = useOrderData();

const data = computed(() => get(query.data));
const deliveryOptions = computed(() => data.value?.deliveryOptions);

const carrier = computed(() => {
  const carriersQuery = useFetchCarrier(deliveryOptions.value?.carrier?.name);

  return get(carriersQuery.data);
});

const config = useAdminConfig();
</script>
