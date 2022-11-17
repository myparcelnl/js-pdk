import {describe, expect, it} from 'vitest';
import {PdkComponentTest} from './executePdkComponentTest';
import {mount} from './mount';
import {runCommonComponentTests} from './runCommonComponentTests';

export const createPdkButtonTest: PdkComponentTest = (name, component) => {
  describe(name, () => {
    runCommonComponentTests(component);

    it('handles click event', async () => {
      expect.assertions(1);
      const wrapper = mount(component);
      const button = wrapper.find('button');

      await button.element.click();
      expect(wrapper.emitted().click).toHaveLength(1);
    });

    it('can be disabled', async () => {
      expect.assertions(2);
      const wrapper = mount(component, {props: {disabled: true}});
      const button = wrapper.find('button');
      expect(button.attributes('disabled')).toBeDefined();

      await button.element.click();
      expect(wrapper.emitted().click).toBeUndefined();
    });

    it('can display custom content', () => {
      const wrapper = mount(component, {slots: {default: 'Test'}});
      expect(wrapper.findAll('*').map((wrapper) => wrapper.text())).toContain('Test');
    });
  });
};
