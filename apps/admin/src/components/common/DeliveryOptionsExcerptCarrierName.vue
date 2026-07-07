<template>
  <CarrierLogo
    v-if="carrierData"
    :carrier="carrierData" />

  <template v-if="carrierData">&nbsp;&nbsp;</template>
</template>

<script lang="ts" setup>
import {computed, toRefs, toValue} from 'vue';
import {type CarrierModel} from '@myparcel-dev/pdk-common';
import {useFetchCarrier} from '../../sdk';
import CarrierLogo from './CarrierLogo.vue';

const props = defineProps<{carrier: CarrierModel}>();
const propRefs = toRefs(props);

const carriersQuery = useFetchCarrier(propRefs.carrier.value.carrier);

const carrierData = computed(() => toValue(carriersQuery.data));
</script>
