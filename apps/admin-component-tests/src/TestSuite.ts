/* eslint-disable max-lines-per-function */
import {type Component, ref} from 'vue';
import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {type ComponentMountingOptions, type DOMWrapper, flushPromises, mount, type VueWrapper} from '@vue/test-utils';
import {type AdminComponent, type ElementInstance} from '@myparcel-pdk/admin';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type AdditionalOptions, type ComponentTestOptions} from './types';
import {createInputOptions} from './helpers';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from './common';

const UPDATE_EVENT = 'update:modelValue';

export class TestSuite<T extends ComponentTestOptions = ComponentTestOptions> {
  private defaultOptions: ComponentMountingOptions<T> | undefined = undefined;

  private readonly component: Component;

  private readonly componentName: AdminComponent | string;

  public constructor(componentName: AdminComponent | string, component: Component) {
    this.componentName = componentName;
    this.component = {name: componentName, ...component};
  }

  public runCommonComponentTests(options?: ComponentMountingOptions<T> | undefined): void {
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
  ): ComponentMountingOptions<{element: ElementInstance; modelValue?: T}> {
    this.defaultOptions = createInputOptions(modelValue, options);

    return this.resolveOptions();
  }

  public getInputWrapper<NodeType extends Node>(wrapper: VueWrapper): DOMWrapper<NodeType> {
    return this.getElementWrapper('input', wrapper);
  }

  public getSelectWrapper<NodeType extends Node>(wrapper: VueWrapper): DOMWrapper<NodeType> {
    return this.getElementWrapper('select', wrapper);
  }

  public setOptions(options: ComponentMountingOptions<T>): ComponentMountingOptions<T> {
    this.defaultOptions = options;

    return this.resolveOptions();
  }

  private getElementWrapper<NodeType extends Node>(element: string, wrapper: VueWrapper): DOMWrapper<NodeType> {
    const byComponentName = wrapper.findByTestId([this.componentName, element]);

    return byComponentName.exists() ? byComponentName : wrapper.find(element);
  }

  private resolveOptions(options?: ComponentMountingOptions<T> | undefined): ComponentMountingOptions<T> {
    return {
      ...this.defaultOptions,
      ...options,
      props: {
        ...this.defaultOptions?.props,
        ...options?.props,
      },
    };
  }
}
