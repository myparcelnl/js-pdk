import {runHasPropTest, runHasSlotTest} from '../common';
import {ComponentTest} from '../types';

export const runActionContainerTest: ComponentTest = (component) => {
  runHasSlotTest(component, 'default');
  runHasSlotTest(component, 'header');
  runHasSlotTest(component, 'footer');

  runHasPropTest(component, 'loading', true);
  runHasPropTest(component, 'actions', []);

  // it('sets options from props', () => {
  //   const wrapper = mount(component, {props: {options}});
  //
  //   expect(
  //     wrapper
  //       .find('select')
  //       .findAll('option')
  //       .actionEndpointMap((wrapper) => wrapper.element.value),
  //   ).toEqual(['1', '2']);
  // });
};
