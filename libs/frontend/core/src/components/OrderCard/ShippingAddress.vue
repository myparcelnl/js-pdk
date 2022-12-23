<template>
  <PdkCard :loading="loading">
    <p>
      <template
        v-for="part in addressParts"
        :key="part">
        {{ part }}
        <br />
      </template>
    </p>
  </PdkCard>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {Plugin} from '@myparcel-pdk/common';

export default defineComponent({
  name: 'ShippingAddress',

  props: {
    loading: {
      type: Boolean,
    },

    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const stringify = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ');

    const fullStreet = computed(() => {
      // todo where's box number?
      return (
        props.order.recipient?.fullStreet ??
        stringify(props.order.recipient?.street, props.order.recipient?.number, props.order.recipient?.numberSuffix)
      );
    });

    const postalCodeCity = computed(() => stringify(props.order.recipient?.postalCode, props.order.recipient?.city));

    return {
      addressParts: computed(() =>
        [
          props.order.recipient?.person,
          props.order.recipient?.company,
          fullStreet.value,
          props.order.recipient?.streetAdditionalInfo,
          postalCodeCity.value,
          props.order.recipient?.cc,
        ].filter(Boolean),
      ),
    };
  },
});
</script>
