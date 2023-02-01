<template>
  <PdkCard>
    <template v-if="hasAccount && !editing">
      <PdkCard>
        <PdkHeading level="3">{{ translate('notification_account_connected') }}</PdkHeading>

        <PdkButton
          variant="primary"
          @click="editing = true">
          {{ translate('button_api_key_edit') }}
        </PdkButton>

        <WebhooksStatus />
      </PdkCard>
    </template>

    <template v-else>
      <EditApiKeyForm @submit="editing = false" />
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useLanguage, useStoreQuery} from '../../composables';
import EditApiKeyForm from './EditApiKeyForm.vue';
import {EndpointName} from '@myparcel-pdk/common';
import WebhooksStatus from './WebhooksStatus.vue';

export default defineComponent({
  name: 'AccountSettings',
  components: {
    EditApiKeyForm,
    WebhooksStatus,
  },

  setup: () => {
    const contextQuery = useStoreQuery(EndpointName.FETCH_CONTEXT);
    const {translate} = useLanguage();
    const editing = ref(false);

    return {
      contextQuery,
      editing,
      translate,

      hasAccount: computed(() => {
        return contextQuery.isLoading || Boolean(contextQuery.data?.account);
      }),
    };
  },
});
</script>
