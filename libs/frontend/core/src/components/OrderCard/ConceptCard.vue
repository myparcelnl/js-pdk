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
          <ShipmentOptionsForm :order="order" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkConceptCardWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {
  orderExportAction,
  orderExportPrintShipmentsAction,
  orderExportShipmentsAction,
  orderUpdateAction,
} from '../../actions';
import {useLanguage, useLoading, usePluginSettings} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {createActions} from '../../services';

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

  setup: () => {
    const {loading, setLoading} = useLoading();
    const pluginSettings = usePluginSettings();
    const {orderMode} = pluginSettings.general;

    const {translate} = useLanguage();

    return {
      loading,
      actions: createActions(
        [
          orderUpdateAction,
          ...(orderMode ? [orderExportAction] : [orderExportShipmentsAction, orderExportPrintShipmentsAction]),
        ],
        {},
        {
          start() {
            setLoading(true);
          },
          end() {
            setLoading(false);
          },
        },
      ),

      translate,
    };
  },
});
</script>
