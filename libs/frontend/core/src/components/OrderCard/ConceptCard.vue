<template>
  <PdkConceptCardWrapper
    :actions="actions"
    :loading="loading">
    <template #header>
      <span v-text="`${translate('concept')} #${order?.externalIdentifier}`" />
    </template>

    <template #default>
      <PdkRow>
        <PdkCol>
          <template v-if="order.exported">
            {{ translate('order_exported') }}
          </template>

          <ShipmentOptionsForm
            v-else
            :order="order" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptCardWrapper>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {createAction, createActions} from '../../services';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  orderViewInBackofficeAction,
  ordersExportPrintShipmentsAction,
  ordersUpdateAction,
} from '../../actions';
import {useLanguage, useLoading, usePluginSettings} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';

export default defineComponent({
  name: 'ConceptCard',
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
    const {loading, actionCallbacks} = useLoading();
    const pluginSettings = usePluginSettings();
    const {orderMode} = pluginSettings.general;

    const {translate} = useLanguage();

    return {
      loading,

      actions: computed(() => {
        if (props.order.exported) {
          return [createAction(orderViewInBackofficeAction)];
        }

        return createActions(
          [
            ordersUpdateAction,
            ...(orderMode ? [orderExportAction] : [orderExportToShipmentsAction, ordersExportPrintShipmentsAction]),
          ],
          {orderIds: props.order.externalIdentifier},
          actionCallbacks,
        );
      }),

      translate,
    };
  },
});
</script>
