<template>
  <div>shipoform</div>

  <ShipmentOptionsForm />

  {{ id }}
</template>

<script lang="ts">
import {useContextStore, useModalStore} from '../../stores';
import {Pdk} from '@myparcel-pdk/frontend-shared';
import ShipmentOptionsForm from '../../components/ShipmentOptionsForm.vue';
import {defineComponent} from 'vue';
import {shipmentOptionsForm} from '../../pdk';

export default defineComponent({
  name: 'ModalShipmentOptionsForm',
  components: {ShipmentOptionsForm},
  props: {
    id: {
      type: String,
    },
  },

  setup: () => {
    const modalStore = useModalStore();
    const contextStore = useContextStore();

    const context = modalStore.context as unknown as Pdk.PluginModelContextOrderDataContext;

    return {
      shipmentOptionsForm,
      context,
    };
  },
});
</script>
