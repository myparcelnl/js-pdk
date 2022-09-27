<template>
  <PdkCard>
    <p v-if="orderQuery.isLoading">
      <span class="animate-pulse bg-gray-400 h-4 w-12"></span>
      <span class="animate-pulse bg-gray-400 h-4 w-12"></span>
    </p>

    <p v-else>
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
import {computed, defineComponent, toRefs} from 'vue';
import {useOrder} from '../../composables/query/orders/useOrder';

export default defineComponent({
  name: 'ShippingAddress',

  props: {
    orderId: {
      type: String,
      default: undefined,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);
    const orderQuery = useOrder(propRefs.orderId);

    const recipient = computed(() => {
      return orderQuery.data.value?.recipient;
    });

    const stringify = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ');

    const fullStreet = computed(() => {
      // todo where's box number?
      return (
        recipient.value?.fullStreet ??
        stringify(recipient.value?.street, recipient.value?.number, recipient.value?.numberSuffix)
      );
    });

    const postalCodeCity = computed(() => stringify(recipient.value?.postalCode, recipient.value?.city));

    return {
      orderQuery,

      addressParts: computed(() =>
        [
          recipient.value?.person,
          recipient.value?.company,
          fullStreet.value,
          recipient.value?.streetAdditionalInfo,
          postalCodeCity.value,
          recipient.value?.cc,
        ].filter(Boolean),
      ),
    };
  },
});
</script>
