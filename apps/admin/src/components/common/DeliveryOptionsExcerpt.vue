<template>
  <div v-if="data && deliveryOptions">
    <span :class="config.cssUtilities?.displayFlex">
      <DeliveryOptionsExcerptCarrierName
        v-if="deliveryOptions?.carrier"
        :carrier="deliveryOptions?.carrier" />

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
import {computed, toValue} from 'vue';
import {useAdminConfig, useOrderData} from '../../composables';
import DeliveryOptionsPackageType from './DeliveryOptionsPackageType.vue';
import DeliveryOptionsExcerptCarrierName from './DeliveryOptionsExcerptCarrierName.vue';
import DeliveryOptionsDeliveryType from './DeliveryOptionsDeliveryType.vue';
import DateRelative from './DateRelative.vue';

const {query} = useOrderData();

const data = computed(() => toValue(query.data));
const deliveryOptions = computed(() => toValue(data)?.deliveryOptions);

const config = useAdminConfig();
</script>
