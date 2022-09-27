<template>
  <PdkCard>
    <template #header>
      <h3
        class="card-header-title"
        v-text="'MyParcel'" />
    </template>

    <template #default>
      <ConceptCard />
      <ShipmentsCard />
    </template>
  </PdkCard>
</template>

<script lang="ts">
import ConceptCard from './ConceptCard.vue';
import {ContextKey} from '@myparcel/pdk-frontend-shared';
import ShipmentsCard from './ShipmentsCard.vue';
import {defineComponent} from 'vue';
import {useInstanceContext} from '../../composables';

/**
 * The "MyParcel" card in the single order view.
 *
 * @see /admin1/index.php/sell/orders/:orderIdentifier/view
 */
export default defineComponent({
  name: 'OrderCard',
  components: {
    ConceptCard,
    ShipmentsCard,
  },

  setup: () => ({
    context: useInstanceContext(ContextKey.ORDER_DATA),
  }),
});
</script>
