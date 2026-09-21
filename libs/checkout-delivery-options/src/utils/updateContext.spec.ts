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

const physicalProperties = (grams: number) => ({weight: {value: grams, unit: 'g'}});
const context = (grams: number | null) => ({
  config: {physicalProperties: grams === null ? null : physicalProperties(grams)},
  strings: {},
});
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
    mocks.checkout.set.mockImplementation(({context: fresh}) => {
      mocks.checkout.state.context = fresh;
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

  it('updates the weight while keeping address, prices and translations', async () => {
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

  it('clears a previously known weight with explicit null', async () => {
    mocks.fetch.mockResolvedValueOnce(context(null));
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toBeNull();
  });

  it('keeps compatibility with an older PDK that omits the optional field', async () => {
    delete mocks.deliveryOptions.state.configuration.config.physicalProperties;
    mocks.fetch.mockResolvedValueOnce({config: {}, strings: {}});
    await updateContext();
    expect(mocks.deliveryOptions.state.configuration.config).not.toHaveProperty('physicalProperties');
  });

  it('applies the platform carrier filter after installing the fresh checkout context', async () => {
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

  it('makes the fresh package type available to the platform mapping', async () => {
    mocks.fetch.mockResolvedValueOnce({config: {packageType: 'mailbox'}, strings: {}});
    mocks.deliveryOptions.state.settings.updateDeliveryOptions.mockImplementation((state) => ({
      ...state.configuration.config,
      packageType: state.originalPackageType,
    }));
    await updateContext();
    expect(mocks.deliveryOptions.state.originalPackageType).toBe('mailbox');
    expect(mocks.deliveryOptions.state.configuration.config.packageType).toBe('mailbox');
  });

  it('ignores an older response that arrives after a newer cart response', async () => {
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

  it('does not apply a response after checkout reinitialization', async () => {
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

  it('clears only the old weight when the latest context request fails', async () => {
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(updateContext()).rejects.toThrow('Network error');
    expect(mocks.checkout.state.context.config.physicalProperties).toBeNull();
    expect(mocks.deliveryOptions.state.configuration).toEqual({
      address: {cc: 'NL'},
      config: {physicalProperties: null, carrierSettings: {dpd: {allowPickupLocations: true, pricePickup: 2}}},
      strings: {label: 'Delivery'},
    });
  });

  it('does not update stores after a failed request for an unweighted legacy cart', async () => {
    delete mocks.deliveryOptions.state.configuration.config.physicalProperties;
    mocks.checkout.state.context = {config: {}, strings: {}};
    mocks.fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(updateContext()).rejects.toThrow('Network error');
    expect(mocks.checkout.set).not.toHaveBeenCalled();
    expect(mocks.deliveryOptions.set).not.toHaveBeenCalled();
  });

  it('does not restore an older weight after the latest request fails', async () => {
    const older = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(older.promise).mockRejectedValueOnce(new Error('Network error'));
    const first = updateContext();
    await expect(updateContext()).rejects.toThrow('Network error');
    older.resolve(context(15000));
    await first;
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toBeNull();
  });

  it('does not clear a newer weight when an older request fails', async () => {
    const older = deferred<ReturnType<typeof context>>();
    mocks.fetch.mockReturnValueOnce(older.promise).mockResolvedValueOnce(context(15000));
    const first = updateContext();
    await updateContext();
    older.reject(new Error('Old failure'));
    await expect(first).rejects.toThrow('Old failure');
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
  });

  it('does not clear a reinitialized checkout after an old request fails', async () => {
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

  it('rechecks the request after asynchronous checkout listeners complete', async () => {
    const listeners = deferred<void>();
    mocks.fetch.mockResolvedValueOnce(context(30000)).mockResolvedValueOnce(context(15000));
    mocks.checkout.set.mockImplementationOnce(({context: fresh}) => {
      mocks.checkout.state.context = fresh;
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

  it('does not let a waiting failure reset overwrite a newer successful response', async () => {
    const listeners = deferred<void>();
    mocks.fetch.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce(context(15000));
    mocks.checkout.set.mockImplementationOnce(({context: fresh}) => {
      mocks.checkout.state.context = fresh;
      return listeners.promise;
    });
    const failed = updateContext();
    await vi.waitFor(() => expect(mocks.checkout.set).toHaveBeenCalledTimes(1));
    await updateContext();
    listeners.resolve();
    await expect(failed).rejects.toThrow('Network error');
    expect(mocks.deliveryOptions.state.configuration.config.physicalProperties).toEqual(physicalProperties(15000));
  });
});
