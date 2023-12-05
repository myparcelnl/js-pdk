<template>
  <PdkModal
    v-test="$.type.__name"
    :actions="actions"
    :modal-key="modalKey"
    title="print_options_title">
    <PrintOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts" setup>
/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */

import {defineAsyncComponent} from 'vue';
import {useActionStore} from '../../stores';
import {instantiateActions} from '../../services';
import {modalCloseAction, modalSubmitFormAction} from '../../actions';
import {AdminModalKey} from "../../data";

const modalKey = AdminModalKey.PrintOptions;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PrintOptionsModalForm = defineAsyncComponent(() => import('./PrintOptionsModalForm.vue'));

const actionStore = useActionStore();

actionStore.register(modalSubmitFormAction);

const actions = instantiateActions([modalCloseAction, modalSubmitFormAction]);
</script>
