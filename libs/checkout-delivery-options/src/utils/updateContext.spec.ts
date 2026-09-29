import {beforeEach, describe, expect, it, vi} from 'vitest';
import {updateContext} from './updateContext';

const mocks = vi.hoisted(() => ({
  fetch: vi.fn(),
  checkout: {state: {context: {config: {} as Record<string, unknown>, strings: {}}}, set: vi.fn()},
  deliveryOptions: {
    state: {
      configuration: {} as Record<string, any>,
      originalPackageType: 'package',
      settings: {updateDeliveryOptions: vi.fn()},
    },
    set: vi.fn(),
  },
}));

vi.mock('@myparcel-dev/pdk-checkout-common', () => ({useCheckoutStore: () => mocks.checkout}));
vi.mock('./useDeliveryOptionsStore', () => ({useDeliveryOptionsStore: () => mocks.deliveryOptions}));
vi.mock('./fetchCheckoutContext', () => ({fetchCheckoutContext: mocks.fetch}));

const physicalProperties = (grams: number) => ({weight: grams});
const context = (grams: number | null) => ({
  config: {physicalProperties: grams === null ? null : physicalProperties(grams)},
  strings: {},
});
/** A promise that the test resolves or rejects itself, to control when a request or a listener finishes. */
const deferred = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return {promise, resolve, reject};
};

describe('updateContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.checkout.state.context = context(30000);
    mocks.checkout.set.mockImplementation(({context: newContext}) => {
      mocks.checkout.state.context = newContext;
    });
    mocks.deliveryOptions = {
      state: {
        originalPackageType: 'package',
        settings: {updateDeliveryOptions: vi.fn((state) => state.configuration.config)},
        configuration: {
          address: {cc: 'NL'},
          config: {
            physicalProperties: physicalProperties(30000),
            carrierSettings: {dpd: {allowPickupLocations: true, pricePickup: 2}},
          },
          strings: {label: 'Delivery'},
        },
      },
      set: vi.fn((update) => {
        Object.assign(mocks.deliveryOptions.state, update);
      }),
    };
  });

  it('updates the weight and keeps the address, prices and strings', async () => {
    mocks.fetch.mockResolvedValueOnce(context(15000));
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration).toEqual({
      address: {cc: 'NL'},
      config: {
        physicalProperties: physicalProperties(15000),
        carrierSettings: {dpd: {allowPickupLocations: true, pricePickup: 2}},
      },
      strings: {label: 'Delivery'},
    });
  });

  it('removes the weight when the new context has a null weight', async () => {
    mocks.fetch.mockResolvedValueOnce(context(null));
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toBeNull();
  });

  it('does not add a weight when an older PDK sends none', async () => {
    delete mocks.deliveryOptions.state.configuration.config.physicalProperties;
    mocks.fetch.mockResolvedValueOnce({config: {}, strings: {}});
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration.config).not.toHaveProperty('physicalProperties');
  });

  it('keeps the current config and package type when the new context has no config', async () => {
    delete mocks.deliveryOptions.state.configuration.config.physicalProperties;
    const configuration = {...mocks.deliveryOptions.state.configuration};
    mocks.fetch.mockResolvedValueOnce({strings: {label: 'Updated delivery'}});

    await updateContext();

    expect(mocks.deliveryOptions.state.originalPackageType).toBe('package');
    expect(mocks.deliveryOptions.state.configuration.config).toEqual(configuration.config);
    expect(mocks.deliveryOptions.state.configuration.address).toEqual(configuration.address);
    expect(mocks.deliveryOptions.state.configuration.strings).toEqual({label: 'Updated delivery'});
  });

  it('removes the weight from the checkout context when the delivery options have no config yet', async () => {
    delete mocks.deliveryOptions.state.configuration.config;
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(updateContext()).rejects.toThrow('Network error');

    expect(mocks.checkout.state.context.config.physicalProperties).toBeNull();
    expect(mocks.deliveryOptions.state.configuration.config).toEqual({physicalProperties: null});
  });

  it('throws the request error when a store listener fails while the weight is removed', async () => {
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));
    mocks.checkout.set.mockRejectedValueOnce(new Error('Listener error'));

    await expect(updateContext()).rejects.toThrow('Network error');

    expect(mocks.deliveryOptions.set).not.toHaveBeenCalled();
  });

  it('lets the platform change the config after the new context is in the checkout store', async () => {
    mocks.fetch.mockResolvedValueOnce({
      config: {carrierSettings: {dpd: {pricePickup: 3}, postnl: {pricePickup: 4}}},
      strings: {},
    });
    mocks.deliveryOptions.state.settings.updateDeliveryOptions.mockImplementation((state) => {
      expect(mocks.checkout.state.context.config).toHaveProperty('carrierSettings.dpd.pricePickup', 3);
      return {...state.configuration.config, carrierSettings: {dpd: state.configuration.config.carrierSettings.dpd}};
    });
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration.config.carrierSettings).toEqual({dpd: {pricePickup: 3}});
  });

  it('passes the package type of the new context to the platform', async () => {
    mocks.fetch.mockResolvedValueOnce({config: {packageType: 'mailbox'}, strings: {}});
    mocks.deliveryOptions.state.settings.updateDeliveryOptions.mockImplementation((state) => ({
      ...state.configuration.config,
      packageType: state.originalPackageType,
    }));
    await updateContext();
    expect(mocks.deliveryOptions.state.originalPackageType).toBe('mailbox');
    expect(mocks.deliveryOptions.state.configuration.config.packageType).toBe('mailbox');
  });

  it('ignores an older response that arrives after a newer one', async () => {
    const older = deferred<ReturnType<typeof context>>();
    const newer = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
    const first = updateContext();
    const second = updateContext();
    newer.resolve(context(15000));
    await second;
    older.resolve(context(30000));
    await first;
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
    expect(mocks.checkout.set).toHaveBeenCalledTimes(1);
  });

  it('ignores a response that arrives after the checkout was initialized again', async () => {
    const pending = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(pending.promise);
    const request = updateContext();
    const previous = mocks.deliveryOptions;
    mocks.deliveryOptions = {...previous, set: vi.fn()};
    pending.resolve(context(15000));
    await request;
    expect(previous.set).not.toHaveBeenCalled();
    expect(mocks.deliveryOptions.set).not.toHaveBeenCalled();
    expect(mocks.checkout.set).not.toHaveBeenCalled();
  });

  it('removes only the weight when the latest request fails', async () => {
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(updateContext()).rejects.toThrow('Network error');
    expect(mocks.checkout.state.context.config.physicalProperties).toBeNull();
    expect(mocks.deliveryOptions.state.configuration).toEqual({
      address: {cc: 'NL'},
      config: {physicalProperties: null, carrierSettings: {dpd: {allowPickupLocations: true, pricePickup: 2}}},
      strings: {label: 'Delivery'},
    });
  });

  it('does not change the stores when a request fails and there is no weight', async () => {
    delete mocks.deliveryOptions.state.configuration.config.physicalProperties;
    mocks.checkout.state.context = {config: {}, strings: {}};
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(updateContext()).rejects.toThrow('Network error');
    expect(mocks.checkout.set).not.toHaveBeenCalled();
    expect(mocks.deliveryOptions.set).not.toHaveBeenCalled();
  });

  it('does not put back an older weight after the latest request fails', async () => {
    const older = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(older.promise).mockRejectedValueOnce(new Error('Network error'));
    const first = updateContext();
    await expect(updateContext()).rejects.toThrow('Network error');
    older.resolve(context(15000));
    await first;
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toBeNull();
  });

  it('does not remove a newer weight when an older request fails', async () => {
    const older = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(older.promise).mockResolvedValueOnce(context(15000));
    const first = updateContext();
    await updateContext();
    older.reject(new Error('Old failure'));
    await expect(first).rejects.toThrow('Old failure');
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
  });

  it('does not change a checkout that was initialized again when an older request fails', async () => {
    const pending = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(pending.promise);
    const request = updateContext();
    const previous = mocks.deliveryOptions;
    mocks.deliveryOptions = {...previous, set: vi.fn()};
    pending.reject(new Error('Old failure'));
    await expect(request).rejects.toThrow('Old failure');
    expect(mocks.checkout.set).not.toHaveBeenCalled();
    expect(previous.set).not.toHaveBeenCalled();
    expect(mocks.deliveryOptions.set).not.toHaveBeenCalled();
  });

  it('ignores the response when a newer request starts while the checkout store listeners run', async () => {
    const listeners = deferred<void>();
    mocks.fetch.mockResolvedValueOnce(context(30000)).mockResolvedValueOnce(context(15000));
    mocks.checkout.set.mockImplementationOnce(({context: newContext}) => {
      mocks.checkout.state.context = newContext;
      return listeners.promise;
    });
    const first = updateContext();
    await vi.waitFor(() => expect(mocks.checkout.set).toHaveBeenCalledTimes(1));
    await updateContext();
    listeners.resolve();
    await first;
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
    expect(mocks.deliveryOptions.set).toHaveBeenCalledTimes(1);
  });

  it('does not remove the weight of a newer response when an older failed request finishes later', async () => {
    const listeners = deferred<void>();
    mocks.fetch.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce(context(15000));
    mocks.checkout.set.mockImplementationOnce(({context: newContext}) => {
      mocks.checkout.state.context = newContext;
      return listeners.promise;
    });
    const failed = updateContext();
    await vi.waitFor(() => expect(mocks.checkout.set).toHaveBeenCalledTimes(1));
    await updateContext();
    listeners.resolve();
    await expect(failed).rejects.toThrow('Network error');
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
  });

  it('keeps the context of the response that came back last', async () => {
    mocks.fetch.mockResolvedValueOnce({config: {isBusiness: true}, strings: {}});

    await updateContext();

    expect(mocks.checkout.state.context.config.isBusiness).toBe(true);
  });

  it('does not fetch when the Delivery Options module is absent', async () => {
    // The core module initializes this slot to null until Delivery Options is loaded.
    mocks.deliveryOptions = null as unknown as typeof mocks.deliveryOptions;

    await expect(updateContext()).resolves.toBeUndefined();
    expect(mocks.fetch).not.toHaveBeenCalled();
  });
});
