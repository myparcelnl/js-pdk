import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runActionContainerTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};
  runCommonComponentTests(component, options);

  runHasSlotTest(component, options, 'default');
  runHasSlotTest(component, options, 'header');
  runHasSlotTest(component, options, 'footer');

  runHasPropTest(component, options, 'loading', true);
  runHasPropTest(component, options, 'actions', []);

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
