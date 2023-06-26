<template>
  <PdkConceptBoxWrapper
    :actions="actions"
    :loading="loading">
    <template #header>
      <PdkIcon :icon="AdminIcon.Shipment" />
      <span>{{ translate('shipment_options_title') }} #{{ data?.externalIdentifier }}</span>
    </template>

    <template #default>
      <PdkRow>
        <PdkCol>
          <template v-if="isExported">
            {{ translate('notification_order_exported') }}
          </template>

          <ShipmentOptionsForm v-else />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {BACKEND_ENDPOINTS_ORDERS} from '@myparcel-pdk/common';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {AdminIcon} from '../../types';
import {defineActions} from '../../services';
import {useLanguage, useOrder, usePluginSettings, useStoreQuery} from '../../composables';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  orderViewInBackofficeAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
} from '../../actions';

const query = useOrder();

const data = computed(() => get(query.data));

const {translate} = useLanguage();
const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.general;

const isExported = computed(() => orderMode && data.value?.exported);

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
    {orderIds: data.value?.externalIdentifier},
  );
});

const loading = computed(() => orderQueries.some((query) => get(query.isLoading)));
</script>
