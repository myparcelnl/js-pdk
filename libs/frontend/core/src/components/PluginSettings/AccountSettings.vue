<template>
  <PdkBox :loading="loading">
    <KeepAlive>
      <Transition
        :name="config.transitions?.tabNavigation"
        mode="out-in">
        <EditApiKeyForm
          v-if="!hasAccount || editingApiKey"
          @afterSubmit="onSubmit" />
        <div v-else>
          <p><StatusIndicator :status="Status.Success" />&nbsp;{{ translate('notification_account_connected') }}</p>

          <PdkButtonGroup>
            <PdkButton
              variant="primary"
              size="small"
              @click="editingApiKey = true">
              {{ translate('button_api_key_edit') }}
            </PdkButton>

            <PdkButton
              variant="primary"
              size="small"
              @click="editingWebhooks = !editingWebhooks">
              {{ translate('button_webhooks_edit') }}
            </PdkButton>
          </PdkButtonGroup>

          <KeepAlive>
            <WebhooksStatus v-if="!editingApiKey && editingWebhooks" />
          </KeepAlive>
        </div>
      </Transition>
    </KeepAlive>
  </PdkBox>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAdminConfig, useLanguage, useStoreContextQuery} from '../../composables';
import EditApiKeyForm from './EditApiKeyForm.vue';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {Status} from '@myparcel-pdk/common/src';
import StatusIndicator from '../common/StatusIndicator.vue';
import WebhooksStatus from './WebhooksStatus.vue';
import {get} from '@vueuse/core';
import {useUpdateAccountMutation} from '../../actions';

const contextQuery = useStoreContextQuery();

const editingApiKey = ref(false);
const editingWebhooks = ref(false);

const updateAccount = useUpdateAccountMutation();

const onSubmit = (form: FormInstance) => {
  hasApiKey.value = Boolean(form.model.apiKey.ref);
  editingApiKey.value = !hasApiKey.value;
};

const hasApiKey = ref(Boolean(get(contextQuery.data)?.pluginSettings.account.apiKey));
const loading = computed(() => get(contextQuery.isLoading) || get(updateAccount.isLoading));

const hasAccount = computed(() => {
  return !loading.value && hasApiKey.value && Boolean(get(contextQuery.data)?.account);
});

const {translate} = useLanguage();

const config = useAdminConfig();
</script>
