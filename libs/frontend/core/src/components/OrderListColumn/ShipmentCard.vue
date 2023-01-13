<template>
  <PdkOrderCardShipmentsWrapper :loading="loading">
    <PdkRow collapse-gutters>
      <PdkCol>
        <PdkImage
          v-if="carrier"
          width="20"
          :alt="carrier?.human"
          :title="carrier?.human"
          :src="useAssetUrl(carrier?.meta.logo_svg)" />

        <PdkLink
          v-if="shipment.barcode && shipment.linkConsumerPortal"
          :class="config?.cssUtilities?.whitespaceNoWrap"
          :title="translate('shipment_barcode')"
          :href="shipment.linkConsumerPortal">
          {{ shipment.barcode }}
        </PdkLink>

        <span
          v-else
          :class="config?.cssUtilities?.whitespaceNoWrap"
          :title="translate('shipment_barcode')">
          {{ shipment.barcode ?? translate('shipment_no_barcode') }}
        </span>
      </PdkCol>
    </PdkRow>

    <PdkRow collapse-gutters>
      <PdkCol>
        <label
          v-if="shipment.status"
          :title="translate('shipment_status')"
          v-text="translate(`shipment_status_${shipment.status}`)" />
      </PdkCol>
    </PdkRow>

    <PdkRow collapse-gutters>
      <PdkCol
        v-for="action in actions"
        :key="`${shipment.id}_${action.id}`">
        <PdkLink
          hide-text
          :action="action" />
      </PdkCol>
    </PdkRow>
  </PdkOrderCardShipmentsWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {shipmentPrintAction, shipmentRefreshAction} from '../../actions';
import {useAssetUrl, useLanguage, useLoading, usePdkConfig} from '../../composables';
import {Shipment} from '@myparcel-pdk/common';
import {createActions} from '../../services';
import {useCarriers} from '../../sdk';

export default defineComponent({
  name: 'ShipmentCard',

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: (props) => {
    const {loading, setLoading} = useLoading();
    const config = usePdkConfig();
    const carriersQuery = useCarriers(props.shipment.carrier?.name);
    const {translate} = useLanguage();

    return {
      actions: createActions(
        [shipmentPrintAction, shipmentRefreshAction],
        {
          shipmentIds: props.shipment.id,
          orderIds: props.shipment.orderId,
        },
        {
          start() {
            setLoading(true);
          },
          end() {
            setLoading(false);
          },
        },
      ),

      carrier: carriersQuery.data,
      config,
      loading,
      translate: translate,
      useAssetUrl,
    };
  },
});
</script>
