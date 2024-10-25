<template>
  <PdkConceptBoxWrapper
    v-test="[$.type.__name, data?.externalIdentifier]"
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

          <ShipmentOptionsForm
            v-else
            :order="data?.externalIdentifier" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {ShipmentOptionsForm} from '../common';
import {instantiateActions} from '../../services/instantiateActions';
import {AdminIcon} from '../../data/constants';
import {usePluginSettings} from '../../composables/context/usePluginSettings';
import {useLanguage} from '../../composables/language/useLanguage';
import {useOrderData} from '../../composables/orders/useOrderData';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
  orderViewInBackofficeAction,
} from '../../actions/definitions/orders';

const {order: data, loading} = useOrderData();

const {translate} = useLanguage();
const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.order;

const isExported = computed(() => pluginSettings.order.orderMode && get(data)?.exported);

const actions = computed(() => {
  if (isExported.value) {
    return instantiateActions(orderViewInBackofficeAction);
  }

  return instantiateActions(
    [
      ordersUpdateAction,
      ...(orderMode
        ? [orderExportAction]
        : [orderExportToShipmentsAction, ordersPrintAction, ordersExportPrintShipmentsAction]),
    ],
    {orderIds: get(data)?.externalIdentifier},
  );
});
</script>
