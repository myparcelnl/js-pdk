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
          <NotificationContainer :category="NotificationCategory.Action" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {ShipmentOptionsForm} from '../common';
import {instantiateActions} from '../../services';
import {AdminIcon, NotificationCategory, OrderMode} from '../../data';
import {useLanguage, useOrderData, useOrderMode} from '../../composables';
import {NotificationContainer} from '../../components';
import {BOX_MODE_ACTIONS, ordersUpdateAction, orderViewInBackofficeAction} from '../../actions';

const {order: data, loading} = useOrderData();

const {translate} = useLanguage();
const orderMode = useOrderMode();

const isExported = computed(() => orderMode.value === OrderMode.OrderV1 && toValue(data)?.exported);

const actions = computed(() => {
  if (isExported.value) {
    return instantiateActions(orderViewInBackofficeAction);
  }

  return instantiateActions([ordersUpdateAction, ...BOX_MODE_ACTIONS[orderMode.value]], {
    orderIds: toValue(data)?.externalIdentifier,
  });
});
</script>
