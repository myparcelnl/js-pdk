<template>
  <PdkButton
    variant="primary"
    @click="open = true">
    {{ translate('button_webhooks_edit') }}
  </PdkButton>

  <div v-if="open">
    <KeepAlive>
      <PdkHeading level="3">{{ translate('notification_webhooks_connected') }}</PdkHeading>

      <ActionButton
        v-for="action in webhookActions"
        :key="action.id"
        :action="action" />

      <ul>
        <li
          v-for="webhook in webhooksQuery.data"
          :key="webhook.hook">
          {{ webhook }}
        </li>
      </ul>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useLanguage, useStoreQuery} from '../../composables';
import {webhooksCreateAllAction, webhooksDeleteAction, webhooksFetchAction} from '../../actions';
import ActionButton from '../common/ActionButton.vue';
import {EndpointName} from '@myparcel-pdk/common';
import {ResolvedAction} from '../../types';
import {createAction} from '../../services';

export default defineComponent({
  name: 'WebhooksStatus',
  components: {ActionButton},

  setup: () => {
    const {translate} = useLanguage();

    const open = ref(false);

    const webhooksQuery = useStoreQuery(EndpointName.FETCH_WEBHOOKS);

    return {
      open,
      translate,
      webhooksQuery,
      webhookActions: computed(() => {
        const actions: ResolvedAction[] = [];

        console.log(webhooksQuery.data);

        if (webhooksQuery.data) {
          actions.push(createAction(webhooksCreateAllAction), createAction(webhooksDeleteAction));
        } else {
          actions.push(createAction(webhooksFetchAction));
        }

        return actions;
      }),
    };
  },
});
</script>
