<template>
  <div>
    <TransitionGroup
      appear
      name="mypa__fade">
      <LabelCard
        v-for="shipment in order?.shipments"
        :key="`${order?.externalIdentifier}_shipment_${shipment.id}`"
        :shipment="shipment" />
    </TransitionGroup>

    <div class="btn-group">
      <PdkButton
        variant="outline-secondary"
        @click="openModal">
        <PdkIcon icon="label" />
        {{ translate('action_create') }} #{{ externalIdentifier }}
      </PdkButton>

      <PdkButton
        v-if="order?.shipments.length"
        variant="primary"
        @click="print">
        <PdkIcon icon="print" />
        {{ translate('action_print') }}
      </PdkButton>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import LabelCard from './LabelCard.vue';
import {ModalKey} from '../../types';
import {Pdk} from '@myparcel-pdk/frontend-shared';
import {useModalStore} from '../../stores';
import {useOrder} from '../../sdk';
import {useTranslate} from '../../composables';

/**
 * The "Labels" column in the orders list.
 *
 * @see /admin1/index.php/sell/orders
 */
export default defineComponent({
  name: 'OrderListColumn',
  components: {
    LabelCard,
  },

  setup: () => {
    const orderQuery = useOrder();

    console.log(orderQuery, orderQuery.data);

    const id = inject('id');
    console.log(id);

    try {
      const modalStore = useModalStore();
      console.log(modalStore);
    } catch (e) {
      console.log(e);
    }

    // const orderQuery = useOrder();

    const order = computed<undefined | Pdk.PluginModelContextOrderDataContext>(() => {
      return orderQuery.data.value;
    });

    const externalIdentifier = computed(() => {
      return order.value?.externalIdentifier;
    });

    return {
      externalIdentifier,
      order,
      orderQuery,

      openModal() {
        const modalStore = useModalStore();

        modalStore.open(ModalKey.SHIPMENT_OPTIONS, externalIdentifier.value as any);
      },

      id,
      translate: useTranslate(),
      print: async (): Promise<void> => {
        // await executeOrderAction(PdkAction.LABEL_PRINT, externalIdentifier ?? undefined);
      },
    };
  },
});
</script>
