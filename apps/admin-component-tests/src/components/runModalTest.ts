import {AdminComponent, AdminModalKey, useModalStore} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runModalTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Modal, component);

  const modalStore = useModalStore();

  modalStore.$patch({opened: AdminModalKey.ShipmentOptions});

  suite.setOptions({
    props: {
      // todo
      actions: [],
      modalKey: AdminModalKey.ShipmentOptions,
      title: 'title',
    },
  });

  suite.runCommonComponentTests();

  suite.runHasSlotTest();

  suite.runHasPropTest('modalKey');
  suite.runHasPropTest('title');
  suite.runHasPropTest('actions');
}) satisfies AdminComponentTest;
