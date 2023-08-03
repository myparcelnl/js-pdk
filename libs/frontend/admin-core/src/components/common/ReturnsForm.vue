<template>
  <MagicForm
    v-test="$.type.__name"
    :form="returnsForm" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MagicForm} from '@myparcel/vue-form-builder';
import {createReturnsForm} from '../../forms';

export default defineComponent({
  name: 'ReturnsForm',
  components: {
    MagicForm,
  },

  props: {
    orderId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return {
      returnsForm: createReturnsForm(props.orderId),
    };
  },
});
</script>
