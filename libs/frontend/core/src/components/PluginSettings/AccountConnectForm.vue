<template>
  <PdkCard>
    <template v-if="(contextQuery.isLoading || contextQuery.data?.global?.account) && !editing">
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

      <ActionButton :action="fetchContext" />

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
import ActionButton from '../common/ActionButton.vue';
import {createAction} from '../../services';
import {fetchContextAction} from '../../actions';

export default defineComponent({
  name: 'AccountConnectForm',
  components: {ActionButton, WebhooksStatus, NotificationContainer, MagicForm},

  setup: () => {
    const queryStore = useQueryStore();
    const contextQuery = queryStore.get(EndpointName.FETCH_CONTEXT);
    const {translate} = useLanguage();
    const editing = ref(false);

    return {
      contextQuery,
      editing,

      form: createAccountSettingsForm(() => {
        editing.value = false;
      }),

      notificationCategory: NotificationCategory.API,

      fetchContext: createAction(fetchContextAction),

      translate,
    };
  },
});
</script>
