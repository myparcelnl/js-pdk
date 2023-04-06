<template>
  <PdkTabNavButtonWrapper>
    <PdkTabNavButton
      v-for="tab in tabs"
      :key="`tab_button_${tab.name}`"
      :tab="tab"
      :active="tab.name === activeTab"
      @click="() => handleClick(tab)" />
  </PdkTabNavButtonWrapper>

  <PdkTabNavContentWrapper v-if="activeTabContents">
    <Transition
      :name="config.transitions?.tabNavigation"
      mode="out-in">
      <KeepAlive>
        <component
          :is="activeTabContents.component"
          :key="activeTabContents.name"
          v-test="`TabNavContent-${activeTabContents.name}`" />
      </KeepAlive>
    </Transition>
  </PdkTabNavContentWrapper>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, ref} from 'vue';
import {useAdminConfig, useLanguage} from '../../composables';
import {TabDefinition} from '@myparcel-pdk/common/src';

/**
 * Tab navigation.
 */
export default defineComponent({
  name: 'TabNavigation',
  props: {
    hashPrefix: {
      type: String,
      default: '',
    },

    tabs: {
      type: Array as PropType<TabDefinition[]>,
      required: true,
    },
  },

  setup: (props) => {
    const hash = window.location.hash.replace('#', '').replace(props.hashPrefix, '');
    const isValidHash = props.tabs.some((tab) => tab.name === hash);
    const initialTab = isValidHash ? hash : props.tabs[0]?.name;

    const activeTab = ref<string>(initialTab);
    const {translate} = useLanguage();

    return {
      handleClick: (tab: TabDefinition) => {
        window.location.hash = props.hashPrefix + tab.name;
        activeTab.value = tab.name;
      },

      config: useAdminConfig(),
      activeTab,
      activeTabContents: computed(() => props.tabs.find((tab) => tab.name === activeTab.value)),
      translate,
    };
  },
});
</script>
