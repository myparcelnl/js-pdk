import {type ComponentMountingOptions} from '@vue/test-utils';
import {AdminModalKey, useModalStore} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runModalTest = ((component) => {
  const modalStore = useModalStore();

  const options = {
    props: {
      // todo
      actions: [],
      modalKey: AdminModalKey.ShipmentOptions,
      title: 'title',
    },
  } satisfies ComponentMountingOptions<any>;

  modalStore.$patch({opened: AdminModalKey.ShipmentOptions});

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'modalKey');
  runHasPropTest(component, options, 'title');
  runHasPropTest(component, options, 'actions');
}) satisfies AdminComponentTest;
