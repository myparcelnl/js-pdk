<template>
  <MagicForm
    v-test
    :form="returnsForm" />
</template>

<script lang="ts">
import {MagicForm} from '@myparcel/vue-form-builder';
import {createReturnsForm} from '../../forms';
import {defineComponent} from 'vue';

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
