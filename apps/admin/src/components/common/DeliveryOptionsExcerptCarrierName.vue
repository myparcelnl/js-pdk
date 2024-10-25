<template>
  <CarrierLogo
    v-if="carrierData"
    :carrier="carrierData" />

  <template v-if="carrierData">&nbsp;&nbsp;</template>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue';
import {get} from '@vueuse/core';
import {type Carrier} from '@myparcel-pdk/common';
import {useFetchCarrier} from '../../sdk/composables/api/useFetchCarrier';
import CarrierLogo from './CarrierLogo.vue';

const props = defineProps<{carrier: Carrier.ModelCarrier}>();
const propRefs = toRefs(props);

const carriersQuery = useFetchCarrier(propRefs.carrier.value.name);

const carrierData = computed(() => get(carriersQuery.data));
</script>
