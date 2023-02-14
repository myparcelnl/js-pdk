<template>
  <label
    v-if="shipment.status"
    v-test="`shipment__status--${shipment.id}`"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${shipment.status}`)" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Shipment} from '@myparcel-pdk/common/src';
import {useLanguage} from '../../composables';

export default defineComponent({
  name: 'ShipmentStatus',
  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: () => {
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
