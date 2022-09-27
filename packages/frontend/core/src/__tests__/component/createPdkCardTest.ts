import {PdkComponentTest} from './executePdkComponentTest';
import {describe} from 'vitest';
import {runCommonComponentTests} from './runCommonComponentTests';
import {runHasSlotTest} from './runHasSlotTest';

export const createPdkCardTest: PdkComponentTest = (name, component) => {
  describe(name, () => {
    runCommonComponentTests(component);
    runHasSlotTest(component, 'default');
    runHasSlotTest(component, 'header');

    // it('sets options from props', () => {
    //   const wrapper = mount(component, {props: {options}});
    //
    //   expect(
    //     wrapper
    //       .find('select')
    //       .findAll('option')
    //       .map((wrapper) => wrapper.element.value),
    //   ).toEqual(['1', '2']);
    // });
  });
};
