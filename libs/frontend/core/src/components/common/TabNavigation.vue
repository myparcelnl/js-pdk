<template>
  <PdkTabNavButtonWrapper>
    <PdkTabNavButton
      v-for="tab in tabs"
      :key="`tab_button_${tab.name}`"
      :tab="tab"
      :active="tab.name === activeTab"
      @click="() => handleClick(tab)" />
  </PdkTabNavButtonWrapper>

  <PdkTabNavContentWrapper>
    <Transition
      :name="pdkConfig.transitions.tabNavigation"
      mode="out-in">
      <KeepAlive>
        <component
          :is="activeTabContents?.component"
          :key="`tab_${activeTabContents?.name}`" />
      </KeepAlive>
    </Transition>
  </PdkTabNavContentWrapper>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, ref} from 'vue';
import {usePdkConfig, useTranslate} from '@myparcel/pdk-frontend';
import {PdkTab} from '@myparcel-pdk/common';

/**
 * Tab navigation.
 */
export default defineComponent({
  name: 'TabNavigation',
  props: {
    tabs: {
      type: Array as PropType<PdkTab[]>,
      required: true,
    },
  },

  setup: (props) => {
    const initialTab = window.location.hash.replace('#', '') || props.tabs[0].name;

    const activeTab = ref<string>(initialTab);

    return {
      handleClick: (tab: PdkTab) => {
        window.location.hash = tab.name;
        activeTab.value = tab.name;
      },

      pdkConfig: usePdkConfig(),
      activeTab,
      activeTabContents: computed(() => props.tabs.find((tab) => tab.name === activeTab.value)),
      translate: useTranslate(),
    };
  },
});
</script>
