<template>
  <PdkConceptBoxWrapper
    :actions="actions"
    :loading="loading">
    <template #header>
      <PdkIcon icon="config" />
      <span>{{ translate('shipment_options') }} #{{ order?.externalIdentifier }}</span>
    </template>

    <template #default>
      <PdkRow>
        <PdkCol>
          <template v-if="isExported">
            {{ translate('order_exported') }}
          </template>

          <ShipmentOptionsForm
            v-else
            :order="order" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptBoxWrapper>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  orderViewInBackofficeAction,
  ordersExportPrintShipmentsAction,
  ordersUpdateAction,
} from '../../actions';
import {useLanguage, usePluginSettings, useStoreQuery} from '../../composables';
import {BACKEND_ENDPOINTS_ORDERS, Plugin} from '@myparcel-pdk/common/src';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentOptionsBox',
  components: {
    ShipmentOptionsForm,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const {translate} = useLanguage();
    const pluginSettings = usePluginSettings();

    const {orderMode} = pluginSettings.general;

    const isExported = computed(() => orderMode && props.order.exported);

    const orderQueries = BACKEND_ENDPOINTS_ORDERS.map((endpoint) => useStoreQuery(endpoint));

    return {
      actions: computed(() => {
        if (isExported.value) {
          return defineActions(orderViewInBackofficeAction);
        }

        return defineActions(
          [
            ordersUpdateAction,
            ...(orderMode ? [orderExportAction] : [orderExportToShipmentsAction, ordersExportPrintShipmentsAction]),
          ],
          {orderIds: props.order.externalIdentifier},
        );
      }),

      isExported,
      loading: computed(() => orderQueries.some((query) => get(query.isLoading))),
      translate,
    };
  },
});
</script>
