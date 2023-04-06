<template>
  <PdkConceptBoxWrapper
    :actions="actions"
    :loading="loading">
    <template #header>
      <PdkIcon icon="config" />
      <span>{{ translate('shipment_options') }} #{{ query.data?.externalIdentifier }}</span>
    </template>

    <template #default>
      <PdkRow>
        <PdkCol>
          <template v-if="isExported">
            {{ translate('order_exported') }}
          </template>

          <ShipmentOptionsForm v-else />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script setup lang="ts">
import {
  orderExportAction,
  orderExportToShipmentsAction,
  orderViewInBackofficeAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
} from '../../actions';
import {useLanguage, useOrder, usePluginSettings, useStoreQuery} from '../../composables';
import {BACKEND_ENDPOINTS_ORDERS} from '@myparcel-pdk/common/src';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {computed} from 'vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';

const query = useOrder();

const {translate} = useLanguage();
const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.general;

const isExported = computed(() => orderMode && get(query.data)?.exported);

const orderQueries = [...BACKEND_ENDPOINTS_ORDERS.map((endpoint) => useStoreQuery(endpoint)), query];

const actions = computed(() => {
  if (isExported.value) {
    return defineActions(orderViewInBackofficeAction);
  }

  return defineActions(
    [
      ordersUpdateAction,
      ...(orderMode
        ? [orderExportAction]
        : [orderExportToShipmentsAction, ordersPrintAction, ordersExportPrintShipmentsAction]),
    ],
    {orderIds: get(query.data)?.externalIdentifier},
  );
});

const loading = computed(() => orderQueries.some((query) => get(query.isLoading)));
</script>
