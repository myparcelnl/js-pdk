import {type Component as ComponentType, ref} from 'vue';
import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {type DOMWrapper, flushPromises, mount, type VueWrapper} from '@vue/test-utils';
import {type AdminComponent} from '@myparcel-pdk/admin';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type AdditionalOptions, type ComponentTestOptions, type TestComponentMountingOptions} from './types';
import {createInputOptions} from './helpers/createInputOptions';
import {runHasSlotTest} from './common/runHasSlotTest';
import {runHasPropTest} from './common/runHasPropTest';
import {runCommonComponentTests} from './common/runCommonComponentTests';

const UPDATE_EVENT = 'update:modelValue';

export class TestSuite<
  TestOptions extends ComponentTestOptions = ComponentTestOptions,
  Component extends ComponentType = ComponentType,
> {
  private defaultOptions: TestComponentMountingOptions<Component, TestOptions> | undefined = undefined;

  private readonly component: Component;

  private readonly componentName: AdminComponent | string;

  public constructor(componentName: AdminComponent | string, component: Component) {
    this.componentName = componentName;
    this.component = {name: componentName, ...component};
  }

  public runCommonComponentTests(options?: TestComponentMountingOptions<Component, TestOptions> | undefined): void {
    runCommonComponentTests(this.component, this.resolveOptions(options));
  }

  public runHasSlotTest(slot = 'default'): void {
    runHasSlotTest(this.component, this.resolveOptions(), slot);
  }

  public runHasPropTest(prop: string, value: unknown = 'value'): void {
    runHasPropTest(this.component, this.resolveOptions(), prop, value);
  }

  public runCommonInputTests(additionalOptions: AdditionalOptions = {}): void {
    const resolvedOptions = this.resolveOptions();

    this.runHasPropTest('element', resolvedOptions?.props?.element);

    it('can be disabled', () => {
      const wrapper = mount(
        this.component,
        merge({}, resolvedOptions, {
          props: {
            element: {
              ...resolvedOptions?.props?.element,
              isDisabled: ref(true),
            },
          },
        }),
      );

      const select = this.getSelectWrapper(wrapper);
      const input = this.getInputWrapper(wrapper);

      if (select.exists()) {
        expect(select.attributes('disabled')).toBeDefined();
      }

      if (input.exists()) {
        expect(input.attributes('disabled')).toBeDefined();
      }
    });

    it(`emits ${UPDATE_EVENT} event`, async () => {
      expect.assertions(2);
      const wrapper = mount(this.component, resolvedOptions);

      const select = this.getSelectWrapper(wrapper);
      const input = this.getInputWrapper(wrapper);

      const valueToSet = additionalOptions?.value ?? 'test';

      if (select.exists()) {
        await select.setValue(valueToSet);
      }

      if (input.exists()) {
        await input.setValue(valueToSet);
      }

      await flushPromises();

      const emitted = wrapper.emitted();

      expect(emitted).toHaveProperty(UPDATE_EVENT);
      expect(emitted[UPDATE_EVENT]).toHaveLength(1);
      /** @todo fix this */
      // expect(emitted[UPDATE_EVENT][0]).toEqual([valueToSet]);
    });
  }

  public createInputOptions<T>(
    modelValue?: T,
    options?: Partial<InteractiveElementConfiguration>,
  ): TestComponentMountingOptions<Component, TestOptions> {
    this.defaultOptions = createInputOptions<T, Component, TestOptions>(modelValue, options);

    return this.resolveOptions();
  }

  public getInputWrapper<NodeType extends Node>(wrapper: VueWrapper<Component>): DOMWrapper<NodeType> {
    return this.getElementWrapper('input', wrapper);
  }

  public getSelectWrapper<NodeType extends Node>(wrapper: VueWrapper<Component>): DOMWrapper<NodeType> {
    return this.getElementWrapper('select', wrapper);
  }

  public setOptions(
    options: TestComponentMountingOptions<Component, TestOptions>,
  ): TestComponentMountingOptions<Component, TestOptions> {
    this.defaultOptions = options;

    return this.resolveOptions();
  }

  private getElementWrapper<NodeType extends Node>(
    element: string,
    wrapper: VueWrapper<Component>,
  ): DOMWrapper<NodeType> {
    const byComponentName = wrapper.findByTestId(this.componentName);

    return (byComponentName.exists()
      ? byComponentName?.find(element)
      : wrapper.find(element)) as unknown as DOMWrapper<NodeType>;
  }

  private resolveOptions(
    options?: TestComponentMountingOptions<Component, TestOptions> | undefined,
  ): TestComponentMountingOptions<Component, TestOptions> {
    return {
      ...this.defaultOptions,
      ...options,
      props: {
        ...this.defaultOptions?.props,
        ...options?.props,
      },
    } as TestComponentMountingOptions<Component, TestOptions>;
  }
}
