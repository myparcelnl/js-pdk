import {ComponentTest} from '../types';
import {runHasSlotTest} from '../common';

export const runActionContainerWrapper: ComponentTest = (component) => {
  runHasSlotTest(component, 'default');
  runHasSlotTest(component, 'header');
  runHasSlotTest(component, 'footer');

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
