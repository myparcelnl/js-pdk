// @vitest-environment happy-dom

import {createApp, defineComponent} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {createPinia} from 'pinia';
import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {useModalStore} from '../../../../stores';
import {AdminModalKey} from '../../../../data';
import {useExportOrdersMutation} from './useExportOrdersMutation';

const exportOrders = vi.fn();

vi.mock('../../../../sdk', () => ({usePdkAdminApi: () => ({exportOrders})}));

const mountMutation = () => {
  let mutation: ReturnType<typeof useExportOrdersMutation> | undefined;
  const app = createApp(
    defineComponent({
      setup() {
        mutation = useExportOrdersMutation('1');

        return () => null;
      },
    }),
  );

  app.use(createPinia());
  app.use(VueQueryPlugin, {queryClient: new QueryClient()});
  app.mount(document.createElement('div'));

  return {
    app,
    mutation: mutation as ReturnType<typeof useExportOrdersMutation>,
  };
};

describe('useExportOrdersMutation', () => {
  afterEach(() => {
    exportOrders.mockReset();
  });

  it('closes the modal that started the export', async () => {
    exportOrders.mockResolvedValue([]);
    const {app, mutation} = mountMutation();
    const modalStore = app.runWithContext(() => useModalStore());

    modalStore.open(AdminModalKey.ShipmentOptions);
    await mutation.mutateAsync({} as never);

    expect(modalStore.opened).toBeNull();
  });

  it('leaves a modal open that the user opened while the export ran', async () => {
    let finish: (value: unknown[]) => void = () => undefined;
    exportOrders.mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const {app, mutation} = mountMutation();
    const modalStore = app.runWithContext(() => useModalStore());

    modalStore.open(AdminModalKey.ShipmentOptions);
    const done = mutation.mutateAsync({} as never);
    await vi.waitFor(() => expect(exportOrders).toHaveBeenCalled());

    // The user closes the modal with Escape and opens the modal of another order.
    modalStore.close();
    modalStore.open(AdminModalKey.ShipmentOptions);
    finish([]);
    await done;

    expect(modalStore.opened).toBe(AdminModalKey.ShipmentOptions);
  });
});
