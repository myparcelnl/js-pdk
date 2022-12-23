<template>
  <PdkCard :actions="actions">
    <template #header>
      <span v-text="`${translate('concept')} #${order?.externalIdentifier}`" />
    </template>

    <template #default>
      <PdkRow>
        <PdkCol>
          <ShipmentOptionsForm :order="order" />
        </PdkCol>
        <PdkCol>
          <ShippingAddress :order="order" />
        </PdkCol>
      </PdkRow>
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {orderExportAction, orderExportPrintAction, orderUpdateAction} from '../../actions';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import ShippingAddress from './ShippingAddress.vue';
import {createActions} from '../../services';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ConceptCard',
  components: {
    ShipmentOptionsForm,
    ShippingAddress,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: () => {
    return {
      actions: createActions([orderUpdateAction, orderExportAction, orderExportPrintAction]),
      translate: useTranslate(),
    };
  },
});
</script>
