<template>
  <div>shipoform</div>

  <ShipmentOptionsForm></ShipmentOptionsForm>

  {{ id }}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useContextStore} from '../../stores';
import {useModalStore} from '../../stores';
import ShipmentOptionsForm from '../../components/forms/ShipmentOptionsForm.vue';

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

    const context = modalStore.context as MyParcelPdk.OrderDataContext;

    return {
      context,
    };
  },
});
</script>
