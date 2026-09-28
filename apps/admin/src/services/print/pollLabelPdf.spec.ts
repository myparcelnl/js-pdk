import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {pollLabelPdf} from './pollLabelPdf';

const fetchLabelPdf = vi.fn();

vi.mock('../../sdk', () => ({usePdkAdminApi: () => ({fetchLabelPdf})}));

describe('pollLabelPdf', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    fetchLabelPdf.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('asks the backend again until the pdf is ready', async () => {
    fetchLabelPdf
      .mockResolvedValueOnce({pending: true})
      .mockResolvedValueOnce({pending: true})
      .mockResolvedValueOnce({data: 'cGRm'});

    const promise = pollLabelPdf('label_hash', {interval: 1000, timeout: 10_000});

    await vi.advanceTimersByTimeAsync(2000);

    await expect(promise).resolves.toBe('cGRm');
    expect(fetchLabelPdf).toHaveBeenCalledTimes(3);
    expect(fetchLabelPdf).toHaveBeenCalledWith({parameters: {labelId: 'label_hash'}});
  });

  it('gives up when the pdf is not ready before the timeout', async () => {
    fetchLabelPdf.mockResolvedValue({pending: true});

    const promise = pollLabelPdf('label_hash', {interval: 1000, timeout: 3000});
    const assertion = expect(promise).rejects.toThrow('timed out');

    await vi.advanceTimersByTimeAsync(5000);

    await assertion;
    expect(fetchLabelPdf).toHaveBeenCalledTimes(4);
  });

  it('stops when the backend reports an error', async () => {
    fetchLabelPdf.mockRejectedValueOnce(new Error('api error'));

    await expect(pollLabelPdf('label_hash', {interval: 1000, timeout: 3000})).rejects.toThrow('api error');
    expect(fetchLabelPdf).toHaveBeenCalledTimes(1);
  });
});
