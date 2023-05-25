<template>
  <PdkTabNavButtonWrapper>
    <PdkTabNavButton
      v-for="tab in tabs"
      :key="`tab_button_${tab.name}`"
      :active="tab.name === activeTab"
      :tab="tab"
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
import {TabDefinition} from '@myparcel-pdk/common';
import {HASH_SEPARATOR} from '../../data';
import {useAdminConfig, useLanguage} from '../../composables';

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
    const tabName = hash.split(HASH_SEPARATOR)[0];

    const isValidHash = props.tabs.some((tab) => tab.name === tabName);
    const initialTab = isValidHash ? tabName : props.tabs[0]?.name;

    const activeTab = ref(initialTab);

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
