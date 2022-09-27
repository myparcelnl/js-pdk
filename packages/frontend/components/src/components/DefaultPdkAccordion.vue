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
      <!--        :key="[child.name, grandchild.name, grandchild.type, grandchildIndex].join('_')" -->
      <!--        :item="grandchild" -->
      <!--        @change="$emit('change', $event)" -->
      <!--        @click="$emit('click', $event)" /> -->
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {PropType, defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'DefaultPdkAccordion',

  props: {
    item: {
      type: Object as PropType<ModuleSettingsFormItem>,
      required: true,
    },
  },

  emits: ['change', 'click'],

  setup: (props) => {
    const openedItem = ref<string>();

    return {
      openedItem,
    };
  },
});
</script>
