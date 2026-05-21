<template>
  <ShipmentOptionsBox />

  <!--
    Shipments mode plus V2 hybrid both surface manual shipments here.
    @TODO INT-1590: restrict to OrderMode.Shipments once V2 with an active sales
          channel hides the manual paths again. Original gate preserved as a
          comment below for easy restoration.
  -->
  <!-- <ShipmentTableBox v-if="orderMode === OrderMode.Shipments && data?.shipments.some((item) => !item.deleted)" /> -->
  <ShipmentTableBox v-if="orderMode !== OrderMode.OrderV1 && data?.shipments.some((item) => !item.deleted)" />
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent, toValue} from 'vue';
import {useActionStore, useQueryStore} from '../stores';
import {OrderMode} from '../data';
import {useOrderData, useOrderMode} from '../composables';
import ShipmentOptionsBox from '../components/OrderBox/ShipmentOptionsBox.vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentTableBox = defineAsyncComponent(() => import('../components/OrderBox/ShipmentTableBox.vue'));

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const actionStore = useActionStore();

actionStore.registerOrderActions();

const orderMode = useOrderMode();

const {query} = useOrderData();

const data = computed(() => toValue(query.data));
</script>
