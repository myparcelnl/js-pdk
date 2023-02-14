<template>
  <PdkButton
    :loading="loading"
    :disabled="disabled"
    :icon="PdkIcon.SAVE"
    label="action_save"
    @click="submit" />
</template>

<script lang="ts">
import {FormInstance, INJECT_FORM} from '@myparcel/vue-form-builder/src';
import {defineComponent, inject} from 'vue';
import {PdkIcon} from '../../types';
import {useLoading} from '../../composables';

export default defineComponent({
  name: 'SubmitButton',

  props: {
    disabled: {
      type: Boolean,
    },
  },

  setup: () => {
    const form = inject(INJECT_FORM) as FormInstance;
    const {loading, setLoading} = useLoading();

    return {
      form,
      PdkIcon,
      loading,
      async submit() {
        setLoading(true);
        await form.submit();
        setLoading(false);
      },
    };
  },
});
</script>
