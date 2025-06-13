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

      <PdkRow>
        <PdkCol>
          <NotificationContainer
            :category="NotificationCategory.Action" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {ShipmentOptionsForm} from '../common';
import {instantiateActions} from '../../services';
import {AdminIcon, NotificationCategory} from '../../data';
import {useLanguage, useOrderData, usePluginSettings} from '../../composables';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
  orderViewInBackofficeAction,
} from '../../actions';
import {NotificationContainer} from '../../components';

const {order: data, loading} = useOrderData();

const {translate} = useLanguage();
const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.order;

const isExported = computed(() => pluginSettings.order.orderMode && toValue(data)?.exported);

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
    {orderIds: toValue(data)?.externalIdentifier},
  );
});
</script>
