import {ref} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {useShipmentCapabilitiesQuery} from './useShipmentCapabilitiesQuery';

type RequestBody = {recipient: {countryCode: string; isBusiness?: boolean}};

let capturedBody: RequestBody | undefined;

const proxyCapabilities = vi.fn((options: {body: RequestBody}) => {
  capturedBody = options.body;

  return Promise.resolve({results: []});
});

vi.mock('@tanstack/vue-query', () => ({
  useQuery: (queryKey: unknown, queryFn: () => Promise<unknown>) => ({queryFn}),
}));

vi.mock('../../../../sdk', () => ({
  usePdkAdminApi: () => ({proxyCapabilities}),
}));

vi.mock('../../../../services', () => ({
  globalLogger: {error: vi.fn(), debug: vi.fn(), warn: vi.fn(), info: vi.fn()},
}));

type QueryFnHolder = {queryFn: () => Promise<unknown>};

const fullSelection = (isBusiness?: boolean) => ({
  cc: 'NL',
  carrier: 'POSTNL',
  packageType: 'PACKAGE',
  deliveryType: 'STANDARD',
  ...(isBusiness === undefined ? null : {isBusiness}),
});

describe('useShipmentCapabilitiesQuery', () => {
  it('forwards the business flag on the recipient body', async () => {
    capturedBody = undefined;

    const query = useShipmentCapabilitiesQuery(ref(fullSelection(true))) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL', isBusiness: true});
  });

  it('sends an explicit consumer flag on the recipient body', async () => {
    capturedBody = undefined;

    const query = useShipmentCapabilitiesQuery(ref(fullSelection(false))) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL', isBusiness: false});
  });

  it('omits isBusiness when the flag is not provided', async () => {
    capturedBody = undefined;

    const query = useShipmentCapabilitiesQuery(ref(fullSelection())) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL'});
  });
});
