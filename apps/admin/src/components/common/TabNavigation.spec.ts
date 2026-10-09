// @vitest-environment happy-dom

import {defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {useAdminConfig} from '../../composables';
import TabNavigation from './TabNavigation.vue';

vi.mock('../../composables', () => ({
  useAdminConfig: vi.fn(),
  useLanguage: vi.fn(() => ({translate: (key: string) => key})),
}));

const createTab = (name: string) => ({
  name,
  label: name,
  component: defineComponent({name: `Tab-${name}`, render: () => h('p', name)}),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const PdkTabNavContentWrapper = defineComponent({
  render() {
    return h('div', this.$slots.default?.());
  },
});

const mountTabs = () =>
  mount(TabNavigation, {
    props: {tabs: [createTab('general'), createTab('label')], button: 'button', buttonWrapper: 'div'},
    global: {stubs: {PdkTabNavContentWrapper}},
  });

const clickTab = async (wrapper: ReturnType<typeof mountTabs>, name: string) => {
  await wrapper
    .findAll('button')
    .find((button) => button.text() === name)
    ?.trigger('click');
};

describe('TabNavigation', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  afterEach(() => {
    window.location.hash = '';
  });

  it('writes the active tab to the location hash by default', async () => {
    vi.mocked(useAdminConfig).mockReturnValue({} as never);
    const wrapper = mountTabs();

    await clickTab(wrapper, 'label');

    expect(window.location.hash).toBe('#label');
    expect(wrapper.text()).toContain('label');
  });

  it('opens the tab from the location hash by default', () => {
    vi.mocked(useAdminConfig).mockReturnValue({} as never);
    window.location.hash = '#label';

    expect(mountTabs().find('p').text()).toBe('label');
  });

  it('leaves the location hash alone when the host app routes with it', async () => {
    vi.mocked(useAdminConfig).mockReturnValue({useLocationHash: false} as never);
    window.location.hash = '#/myparcel/settings/index';
    const wrapper = mountTabs();

    expect(wrapper.find('p').text()).toBe('general');

    await clickTab(wrapper, 'label');

    expect(window.location.hash).toBe('#/myparcel/settings/index');
    expect(wrapper.find('p').text()).toBe('label');
  });
});
