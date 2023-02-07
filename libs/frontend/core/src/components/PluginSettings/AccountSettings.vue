<template>
  <PdkCard>
    <template v-if="!hasAccount || editing">
      <EditApiKeyForm @submit="onSubmit" />
    </template>

    <template v-else>
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
  </PdkCard>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useAccount, useLanguage, useStoreContextQuery} from '../../composables';
import EditApiKeyForm from './EditApiKeyForm.vue';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import WebhooksStatus from './WebhooksStatus.vue';

export default defineComponent({
  name: 'AccountSettings',
  components: {
    EditApiKeyForm,
    WebhooksStatus,
  },

  setup: () => {
    const contextQuery = useStoreContextQuery();
    const account = useAccount();

    const {translate} = useLanguage();
    const editing = ref(false);
    const hasApiKey = ref(true);

    return {
      editing,
      translate,

      hasAccount: computed(() => {
        return hasApiKey.value && (contextQuery.isLoading || Boolean(account));
      }),

      onSubmit: (form: FormInstance) => {
        hasApiKey.value = Boolean(form.model.apiKey);
        editing.value = hasApiKey.value;
      },
    };
  },
});
</script>
