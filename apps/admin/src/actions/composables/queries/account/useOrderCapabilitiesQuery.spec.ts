import {ref} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {useOrderCapabilitiesQuery} from './useOrderCapabilitiesQuery';

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

describe('useOrderCapabilitiesQuery', () => {
  it('forwards the business flag on the recipient body', async () => {
    capturedBody = undefined;

    const query = useOrderCapabilitiesQuery(ref({cc: 'NL', isBusiness: true})) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL', isBusiness: true});
  });

  it('sends an explicit consumer flag on the recipient body', async () => {
    capturedBody = undefined;

    const query = useOrderCapabilitiesQuery(ref({cc: 'NL', isBusiness: false})) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL', isBusiness: false});
  });

  it('omits isBusiness when the flag is not provided', async () => {
    capturedBody = undefined;

    const query = useOrderCapabilitiesQuery(ref({cc: 'NL'})) as unknown as QueryFnHolder;
    await query.queryFn();

    expect(capturedBody?.recipient).toEqual({countryCode: 'NL'});
  });
});
