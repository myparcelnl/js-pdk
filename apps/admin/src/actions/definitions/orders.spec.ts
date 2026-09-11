// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {type ActionContext} from '../executors/types';
import {useActionStore, useModalStore} from '../../stores';
import {AdminAction, AdminModalKey} from '../../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import {ordersEditAction} from './orders';

const edit = (orderIds: string | string[]): Promise<unknown> =>
  Promise.resolve(ordersEditAction.handler({parameters: {orderIds}} as unknown as ActionContext));

describe('ordersEditAction', () => {
  beforeEach(() => {
    doComponentTestSetup();
    vi.mocked(useActionStore().dispatch).mockResolvedValue(undefined);
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('loads the order before it opens the modal', async () => {
    let resolveFetch: () => void = () => undefined;
    const dispatch = vi.mocked(useActionStore().dispatch).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const open = vi.mocked(useModalStore().open);

    const handled = edit('TEST-1');

    expect(dispatch).toHaveBeenCalledWith(AdminAction.OrdersFetch, {orderIds: 'TEST-1'});
    expect(open).not.toHaveBeenCalled();

    resolveFetch();
    await handled;

    expect(open).toHaveBeenCalledWith(AdminModalKey.ShipmentOptions, {orderIds: 'TEST-1'});
  });

  it('does not load anything for a bulk selection', async () => {
    await edit(['TEST-1', 'TEST-2']);

    expect(useActionStore().dispatch).not.toHaveBeenCalled();
    expect(useModalStore().open).toHaveBeenCalledWith(AdminModalKey.ShipmentOptions, {
      orderIds: ['TEST-1', 'TEST-2'],
    });
  });

  it('accepts a single id given as an array', async () => {
    await edit(['TEST-1']);

    expect(useActionStore().dispatch).toHaveBeenCalledWith(AdminAction.OrdersFetch, {orderIds: ['TEST-1']});
    expect(useModalStore().opened).toBe(AdminModalKey.ShipmentOptions);
  });
});
