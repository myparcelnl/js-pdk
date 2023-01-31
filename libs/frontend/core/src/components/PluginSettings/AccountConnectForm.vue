<template>
  <PdkCard>
    <template v-if="(accountQuery.isLoading || accountQuery.data) && !editing">
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
      <MagicForm :form="form" />

      <NotificationContainer :category="notificationCategory" />
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {EndpointName} from '@myparcel-pdk/common';
import {MagicForm} from '@myparcel/vue-form-builder';
import {NotificationCategory} from '../../types';
import NotificationContainer from '../common/NotificationContainer.vue';
import WebhooksStatus from './WebhooksStatus.vue';
import {createAccountSettingsForm} from '../../forms/createAccountSettingsForm';
import {useLanguage} from '../../composables';
import {useQueryStore} from '../../stores';

export default defineComponent({
  name: 'AccountConnectForm',
  components: {WebhooksStatus, NotificationContainer, MagicForm},

  setup: () => {
    const queryStore = useQueryStore();
    const accountQuery = queryStore.get(EndpointName.FETCH_ACCOUNT);
    const {translate} = useLanguage();
    const editing = ref(false);

    return {
      accountQuery,
      editing,

      form: createAccountSettingsForm(() => {
        editing.value = false;
      }),

      notificationCategory: NotificationCategory.API,

      translate,
    };
  },
});
</script>
