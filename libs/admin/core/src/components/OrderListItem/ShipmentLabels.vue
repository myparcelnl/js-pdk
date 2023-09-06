<template>
  <TransitionGroup
    v-test="$.type.__name"
    :name="config?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in data?.shipments ?? []"
      :key="`${data?.externalIdentifier}_${shipment.id}`"
      :shipment-id="shipment.id" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {useAdminConfig, useOrderData} from '../../composables';
import ShipmentLabel from './ShipmentLabel.vue';

const {query} = useOrderData();
const data = computed(() => get(query.data));

const config = useAdminConfig();
</script>
