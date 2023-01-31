<template>
  <div>
    <PdkHeading level="3">{{ translate('notification_webhooks_connected') }}</PdkHeading>

    <ActionButton
      v-for="action in webhookActions"
      :key="action.id"
      :action="action" />

    <ul>
      <li v-for="webhook in webhooksQuery.data">{{ webhook }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {webhooksCreateAllAction, webhooksDeleteAction, webhooksFetchAction} from '../../actions';
import ActionButton from '../common/ActionButton.vue';
import {EndpointName} from '@myparcel-pdk/common';
import {ResolvedAction} from '../../types';
import {createAction} from '../../services';
import {useLanguage} from '../../composables';
import {useQueryStore} from '../../stores';

export default defineComponent({
  name: 'WebhooksStatus',
  components: {ActionButton},

  setup: () => {
    const queryStore = useQueryStore();
    const {translate} = useLanguage();

    const webhooksQuery = queryStore.get(EndpointName.FETCH_WEBHOOKS);

    return {
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
