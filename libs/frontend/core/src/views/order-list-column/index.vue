<template>
  <div>
    <TransitionGroup
      appear
      :name="pdkConfig?.transitions?.labelCard">
      <LabelCard
        v-for="shipment in order?.shipments ?? []"
        :key="`${order?.externalIdentifier}_shipment_${shipment.id}`"
        :shipment="shipment" />
    </TransitionGroup>

    <div class="btn-group">
      <PdkButton @click="openModal">
        <PdkIcon icon="label" />
        {{ translate('action_create') }} #{{ externalIdentifier }}
      </PdkButton>

      <PdkButton
        v-if="order?.shipments.length"
        @click="print">
        <PdkIcon icon="print" />
        {{ translate('action_print') }}
      </PdkButton>
    </div>
  </div>
</template>

<script lang="ts">
import {ModalKey, useModalStore, useOrderQuery, usePdkConfig, useTranslate} from '../../';
import {computed, defineComponent, inject} from 'vue';
import LabelCard from './LabelCard.vue';
import {Plugin} from '@myparcel-pdk/common';

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
    const query = useOrderQuery();
    const pdkConfig = usePdkConfig();

    const id = inject('id');

    // const query = useOrderQuery();

    const order = computed<undefined | Plugin.ModelContextOrderDataContext>(() => {
      return query.data.value;
    });

    const externalIdentifier = computed(() => {
      return order.value?.externalIdentifier;
    });

    return {
      id,
      externalIdentifier,
      order,
      query,
      translate: useTranslate(),
      pdkConfig,

      openModal() {
        const modalStore = useModalStore();

        modalStore.open(ModalKey.SHIPMENT_OPTIONS, externalIdentifier.value);
      },

      print: async (): Promise<void> => {
        // await executeOrderAction(PdkAction.SHIPMENT_PRINT, externalIdentifier ?? undefined);
      },
    };
  },
});
</script>
