import {ref} from 'vue';
import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {flushPromises, mount} from '@vue/test-utils';
import {AdminComponent, type DropOffInputModelValue} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runDropOffInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.DropOffInput, component);

  const options = suite.createInputOptions({
    dropOffDays: [
      {
        date: {date: '', timezone: '', timezone_type: 3},
        cutoffTime: '12:00',
        dispatch: true,
        sameDayCutoffTime: '',
        weekday: 2,
      },
    ],
    dropOffDaysDeviations: [],
  } satisfies DropOffInputModelValue);

  suite.runCommonComponentTests();
  suite.runHasPropTest('element', options.props?.element);

  // The common input tests expect a single input, a drop-off input has inputs for every day.
  it('disables the inputs of every day', async () => {
    const wrapper = mount(
      component,
      merge({}, options, {props: {element: {...options.props?.element, isDisabled: ref(true)}}}),
    );

    await flushPromises();

    const inputs = wrapper.findAll('input:not([type="hidden"])');

    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach((input) => expect(input.attributes('disabled')).toBeDefined());
  });

  it('emits update:modelValue when a day is switched on', async () => {
    const wrapper = mount(component, options);
    const checkbox = wrapper.findAll('input[type="checkbox"]').find((input) => !(input.element as HTMLInputElement).checked);

    await checkbox?.setValue(true);
    await flushPromises();

    const emitted = wrapper.emitted('update:modelValue') as [DropOffInputModelValue][] | undefined;

    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0].dropOffDays.filter(({dispatch}) => dispatch)).toHaveLength(2);
  });
}) satisfies AdminComponentTest;
