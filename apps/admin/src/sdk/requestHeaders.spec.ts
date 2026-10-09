import {afterEach, describe, expect, it} from 'vitest';
import {addRequestHeaders, setRequestHeadersProvider} from './requestHeaders';

describe('addRequestHeaders', () => {
  afterEach(() => {
    setRequestHeadersProvider(undefined);
  });

  it('returns the options unchanged without a provider', async () => {
    const options = {headers: {Accept: 'application/json'}};

    expect(await addRequestHeaders(options)).toEqual({headers: {Accept: 'application/json'}});
  });

  it('merges the headers of a synchronous provider', async () => {
    setRequestHeadersProvider(() => ({Authorization: 'Bearer one'}));

    expect(await addRequestHeaders({headers: {Accept: 'application/json'}})).toEqual({
      headers: {Accept: 'application/json', Authorization: 'Bearer one'},
    });
  });

  it('merges the headers of an asynchronous provider', async () => {
    setRequestHeadersProvider(() => Promise.resolve({Authorization: 'Bearer two'}));

    expect(await addRequestHeaders({})).toEqual({headers: {Authorization: 'Bearer two'}});
  });

  it('calls the provider for every request', async () => {
    let token = 0;
    setRequestHeadersProvider(() => ({Authorization: `Bearer ${++token}`}));

    await addRequestHeaders({});
    const second = await addRequestHeaders({});

    expect(second.headers).toEqual({Authorization: 'Bearer 2'});
  });

  it('lets the provider override a static header', async () => {
    setRequestHeadersProvider(() => ({Authorization: 'Bearer new'}));

    expect(await addRequestHeaders({headers: {Authorization: 'Bearer old'}})).toEqual({
      headers: {Authorization: 'Bearer new'},
    });
  });
});
