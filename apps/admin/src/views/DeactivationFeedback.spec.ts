// @vitest-environment happy-dom

import {defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, flushPromises, mount} from '@vue/test-utils';
import {sendDeactivationFeedback} from '../services/deactivation/sendDeactivationFeedback';
import {doComponentTestSetup, doComponentTestTeardown} from '../__tests__';
import DeactivationFeedback from './DeactivationFeedback.vue';

const LINK_SELECTOR = 'tr[data-plugin^="my-plugin/"] .deactivate a';
const DEACTIVATE_URL = 'https://example.test/wp-admin/plugins.php?action=deactivate';

const context = {
  linkSelector: LINK_SELECTOR as string | null,
  reasons: [
    {value: 'no_longer_needed', label: 'No longer needed', hasDetails: false},
    {value: 'other', label: 'Other', hasDetails: true},
  ],
  translations: {
    title: 'Why?',
    description: 'Tell us',
    detailsPlaceholder: 'Details',
    submit: 'Submit',
    skip: 'Skip',
    cancel: 'Cancel',
  },
};

vi.mock('../composables', async (importOriginal) => ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  ...(await importOriginal<typeof import('../composables')>()),
  useContext: vi.fn(() => context),
}));

vi.mock('../stores', async (importOriginal) => ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  ...(await importOriginal<typeof import('../stores')>()),
  useQueryStore: vi.fn(() => ({registerContextQueries: vi.fn()})),
}));

vi.mock('../services/deactivation/sendDeactivationFeedback', () => ({
  sendDeactivationFeedback: vi.fn(() => Promise.resolve()),
}));

// eslint-disable-next-line @typescript-eslint/naming-convention
const SlotComponent = defineComponent({
  setup:
    (_, {slots}) =>
    () =>
      h('div', [slots.header?.(), slots.default?.(), slots.footer?.()]),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const TestButton = defineComponent({
  props: {disabled: Boolean, variant: {type: String, default: undefined}},
  emits: ['click'],
  setup:
    (props, {slots, emit}) =>
    () =>
      h('button', {disabled: props.disabled, type: 'button', onClick: () => emit('click')}, slots.default?.()),
});

const renderPluginsOverview = (): HTMLAnchorElement => {
  document.body.innerHTML = `
    <table>
      <tr data-plugin="my-plugin/my-plugin.php">
        <td><span class="deactivate"><a href="${DEACTIVATE_URL}">Deactivate</a></span></td>
      </tr>
    </table>
  `;

  return document.querySelector('.deactivate a') as HTMLAnchorElement;
};

const click = (element: HTMLElement, init: MouseEventInit = {}): MouseEvent => {
  const event = new MouseEvent('click', {bubbles: true, cancelable: true, button: 0, ...init});
  element.dispatchEvent(event);

  return event;
};

const findButton = (wrapper: ReturnType<typeof mount>, text: string) => {
  const button = wrapper.findAll('button').find((item) => item.text() === text);

  if (!button) {
    throw new Error(`Button "${text}" not found`);
  }

  return button;
};

describe('DeactivationFeedback', () => {
  let location: {href: string};

  beforeEach(() => {
    doComponentTestSetup();

    config.global.stubs.PdkBox = SlotComponent;
    config.global.stubs.PdkButtonGroup = SlotComponent;
    config.global.stubs.PdkButton = TestButton;

    location = {href: ''};
    vi.stubGlobal('location', location);
    context.linkSelector = LINK_SELECTOR;
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('opens the modal instead of deactivating', async () => {
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    const event = click(link);
    await flushPromises();

    expect(event.defaultPrevented).toBe(true);
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Why?');

    wrapper.unmount();
  });

  it('does not intercept a click that opens the link in a new tab', async () => {
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    const event = click(link, {ctrlKey: true});
    await flushPromises();

    expect(event.defaultPrevented).toBe(false);
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it('does nothing when the plugin sets no link selector', async () => {
    context.linkSelector = null;
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    const event = click(link);
    await flushPromises();

    expect(event.defaultPrevented).toBe(false);

    wrapper.unmount();
  });

  it('closes on cancel without deactivating', async () => {
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    click(link);
    await flushPromises();
    await findButton(wrapper, 'Cancel').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(location.href).toBe('');

    wrapper.unmount();
  });

  it('deactivates without feedback on skip', async () => {
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    click(link);
    await flushPromises();
    await findButton(wrapper, 'Skip').trigger('click');
    await flushPromises();

    expect(sendDeactivationFeedback).not.toHaveBeenCalled();
    expect(location.href).toBe(DEACTIVATE_URL);

    wrapper.unmount();
  });

  it('disables submit until a reason is selected', async () => {
    const link = renderPluginsOverview();
    const wrapper = mount(DeactivationFeedback);

    click(link);
    await flushPromises();

    expect(findButton(wrapper, 'Submit').attributes('disabled')).toBeDefined();

    wrapper.unmount();
  });
});
