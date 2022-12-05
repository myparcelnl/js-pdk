<template>
  <PdkCard
    v-for="(child, index) in item.children"
    :key="[child.name, child.type, index].join('_')"
    @clickHeader="openedItem = child.name === openedItem ? null : child.name">
    <template #header>
      {{ child.label }}

      <span v-if="child.name === openedItem"> v</span>
      <span v-else> ></span>
    </template>

    <template #default>
      <!--      <SettingsFormItem -->
      <!--        v-for="(grandchild, grandchildIndex) in child.children" -->
      <!--        v-show="openedItem === child.name" -->
      <!--        :k="[child.name, grandchild.name, grandchild.type, grandchildIndex].join('_')" -->
      <!--        :item="grandchild" -->
      <!--        @change="$emit('change', $event)" -->
      <!--        @click="$emit('click', $event)" /> -->
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

/**
 * Accordion component that can expand and render a form item inside it.
 */
export default defineComponent({
  name: 'DefaultPdkAccordion',
  props: {
    /**
     * The settings form item to render inside the accordion.
     */
    item: {
      type: Object,
      required: true,
    },
  },

  emits: ['change', 'click'],

  setup: () => {
    const openedItem = ref<string>();

    return {
      openedItem,
    };
  },
});
</script>
