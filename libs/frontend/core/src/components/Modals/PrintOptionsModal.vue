<template>
  <PdkModal
    :modal-key="modalKey"
    title="print_options_title"
    :actions="actions">
    <PrintOptionsModalForm />
  </PdkModal>
</template>

<script setup lang="ts">
/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */

import {modalCloseAction, modalSubmitFormAction} from '../../actions';
import {AdminModalKey} from '../../types';
import {defineActions} from '../../services';
import {defineAsyncComponent} from 'vue';
import {useActionStore} from '../../stores';

const modalKey = AdminModalKey.PrintOptions;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PrintOptionsModalForm = defineAsyncComponent(() => import('./PrintOptionsModalForm.vue'));

const actionStore = useActionStore();

actionStore.register(modalSubmitFormAction);

const actions = defineActions([modalCloseAction, modalSubmitFormAction]);
</script>
