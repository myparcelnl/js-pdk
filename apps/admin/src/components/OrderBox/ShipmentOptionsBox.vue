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

          <ShipmentOptionsForm v-else />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {AdminIcon} from '../../types';
import {instantiateActions} from '../../services';
import {useLanguage, useOrderData, usePluginSettings} from '../../composables';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
  orderViewInBackofficeAction,
} from '../../actions';

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
