// @vitest-environment happy-dom

import {defineComponent, h, type PropType} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, flushPromises, mount, type VueWrapper} from '@vue/test-utils';
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
const TestButton = defineComponent({
  props: {disabled: Boolean, variant: {type: String, default: undefined}},
  emits: ['click'],
  setup:
    (props, {slots, emit}) =>
    () =>
      h('button', {disabled: props.disabled, type: 'button', onClick: () => emit('click')}, slots.default?.()),
});

/**
 * Renders a radio input per option, like the radio groups of the presets.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const TestRadioGroup = defineComponent({
  props: {
    modelValue: {type: String, default: undefined},
    element: {type: Object as PropType<{props: {options: {value: string; plainLabel: string}[]}}>, required: true},
  },
  emits: ['update:modelValue'],
  setup:
    (props, {emit}) =>
    () =>
      h(
        'div',
        props.element.props.options.map((option) =>
          h('input', {
            type: 'radio',
            value: option.value,
            checked: props.modelValue === option.value,
            onChange: () => emit('update:modelValue', option.value),
          }),
        ),
      ),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const TestTextArea = defineComponent({
  props: {modelValue: {type: String, default: ''}},
  emits: ['update:modelValue'],
  setup:
    (props, {emit}) =>
    () =>
      h('textarea', {
        value: props.modelValue,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value),
      }),
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

const findButton = (wrapper: VueWrapper, text: string) => {
  const button = wrapper
    .findAll('button')
    .find((item) => item.text() === text || item.attributes('aria-label') === text);

  if (!button) {
    throw new Error(`Button "${text}" not found`);
  }

  return button;
};

const openModal = async (): Promise<VueWrapper> => {
  const link = renderPluginsOverview();
  const wrapper = mount(DeactivationFeedback);

  click(link);
  await flushPromises();

  return wrapper;
};

const selectReason = async (wrapper: VueWrapper, value: string): Promise<void> => {
  await wrapper.find(`input[value="${value}"]`).trigger('change');
};

describe('DeactivationFeedback', () => {
  let location: {href: string};

  beforeEach(() => {
    doComponentTestSetup();

    config.global.stubs.PdkButton = TestButton;
    config.global.stubs.PdkRadioGroup = TestRadioGroup;
    config.global.stubs.PdkTextArea = TestTextArea;

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

  it.each([
    ['the close button', async (wrapper: VueWrapper) => findButton(wrapper, 'Cancel').trigger('click')],
    ['escape', async (wrapper: VueWrapper) => wrapper.find('[role="dialog"]').trigger('keydown', {key: 'Escape'})],
    [
      'a click outside the dialog',
      async (wrapper: VueWrapper) => wrapper.find('.pdk-deactivation-feedback').trigger('click'),
    ],
  ])('closes on %s without deactivating', async (_, close) => {
    const wrapper = await openModal();

    await close(wrapper);

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(location.href).toBe('');

    wrapper.unmount();
  });

  it('deactivates without feedback on skip', async () => {
    const wrapper = await openModal();

    await findButton(wrapper, 'Skip').trigger('click');
    await flushPromises();

    expect(sendDeactivationFeedback).not.toHaveBeenCalled();
    expect(location.href).toBe(DEACTIVATE_URL);

    wrapper.unmount();
  });

  it('disables submit until a reason is selected', async () => {
    const wrapper = await openModal();

    expect(findButton(wrapper, 'Submit').attributes('disabled')).toBeDefined();

    await selectReason(wrapper, 'no_longer_needed');

    expect(findButton(wrapper, 'Submit').attributes('disabled')).toBeUndefined();

    wrapper.unmount();
  });

  it('shows the details field only for reasons that ask for details', async () => {
    const wrapper = await openModal();

    await selectReason(wrapper, 'no_longer_needed');
    expect(wrapper.find('textarea').exists()).toBe(false);

    await selectReason(wrapper, 'other');
    expect(wrapper.find('textarea').exists()).toBe(true);

    wrapper.unmount();
  });

  it('sends the reason and details, then deactivates', async () => {
    const wrapper = await openModal();

    await selectReason(wrapper, 'other');
    await wrapper.find('textarea').setValue('  Too expensive  ');
    await findButton(wrapper, 'Submit').trigger('click');
    await flushPromises();

    expect(sendDeactivationFeedback).toHaveBeenCalledWith({reason: 'other', details: 'Too expensive'});
    expect(location.href).toBe(DEACTIVATE_URL);

    wrapper.unmount();
  });

  it('drops the details when the selected reason does not ask for them', async () => {
    const wrapper = await openModal();

    await selectReason(wrapper, 'other');
    await wrapper.find('textarea').setValue('Text');
    await selectReason(wrapper, 'no_longer_needed');
    await findButton(wrapper, 'Submit').trigger('click');
    await flushPromises();

    expect(sendDeactivationFeedback).toHaveBeenCalledWith({reason: 'no_longer_needed', details: ''});

    wrapper.unmount();
  });

  it('still deactivates when sending the feedback fails', async () => {
    vi.mocked(sendDeactivationFeedback).mockRejectedValueOnce(new Error('Network error'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = await openModal();

    await selectReason(wrapper, 'no_longer_needed');
    await findButton(wrapper, 'Submit').trigger('click');
    await flushPromises();

    expect(location.href).toBe(DEACTIVATE_URL);

    wrapper.unmount();
  });

  it('ignores cancel and a second submit once the deactivation started', async () => {
    let resolve: () => void = () => undefined;
    vi.mocked(sendDeactivationFeedback).mockImplementationOnce(
      async () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    const wrapper = await openModal();

    await selectReason(wrapper, 'no_longer_needed');
    await findButton(wrapper, 'Submit').trigger('click');
    await wrapper.find('[role="dialog"]').trigger('keydown', {key: 'Escape'});
    await findButton(wrapper, 'Submit').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(sendDeactivationFeedback).toHaveBeenCalledTimes(1);

    resolve();
    await flushPromises();

    expect(location.href).toBe(DEACTIVATE_URL);

    wrapper.unmount();
  });

  it('keeps the focus inside the dialog', async () => {
    const wrapper = await openModal();

    // The attachTo option needs Vue 3.5, so attach the element by hand to make focus() work.
    document.body.appendChild(wrapper.element);

    const dialog = wrapper.find('[role="dialog"]');
    const close = findButton(wrapper, 'Cancel').element as HTMLButtonElement;
    // Submit is disabled, so "Skip" is the last focusable element.
    const skip = findButton(wrapper, 'Skip').element as HTMLButtonElement;

    skip.focus();
    await dialog.trigger('keydown', {key: 'Tab'});
    expect(document.activeElement).toBe(close);

    close.focus();
    await dialog.trigger('keydown', {key: 'Tab', shiftKey: true});
    expect(document.activeElement).toBe(skip);

    wrapper.element.remove();
    wrapper.unmount();
  });
});
