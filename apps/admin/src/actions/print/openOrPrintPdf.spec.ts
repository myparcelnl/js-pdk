// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {Variant} from '@myparcel-dev/pdk-common';
import {useNotificationStore} from '../../stores';
import {LABELS_NOTIFICATION_ID, showLabelsLoading} from '../../services/print/labelsNotification';
import {openOrPrintPdf} from './openOrPrintPdf';

const {fetchLabelPdf, openUrlInNewTab, downloadFileFromUrl} = vi.hoisted(() => ({
  fetchLabelPdf: vi.fn(),
  openUrlInNewTab: vi.fn(),
  downloadFileFromUrl: vi.fn(),
}));

vi.mock('../../sdk', () => ({usePdkAdminApi: () => ({fetchLabelPdf})}));

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();

  return {...actual, openUrlInNewTab, downloadFileFromUrl};
});

vi.mock('../../composables', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../composables')>();

  return {...actual, useLanguage: () => ({translate: (key: string) => key, has: () => true})};
});

const labelsNotification = () => {
  return useNotificationStore().notifications.find((notification) => notification.id === LABELS_NOTIFICATION_ID);
};

const print = (output: 'open' | 'download') => {
  return openOrPrintPdf({
    // @ts-expect-error only the fields openOrPrintPdf reads
    response: {url: 'https://api/pdfs/label_hash', labelId: 'label_hash'},
    // @ts-expect-error only the fields openOrPrintPdf reads
    parameters: {orderIds: ['1', '2'], output},
  });
};

describe('openOrPrintPdf with a label link', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
    fetchLabelPdf.mockReset();
    openUrlInNewTab.mockReset();
    downloadFileFromUrl.mockReset();
    URL.createObjectURL = vi.fn(() => 'blob:labels');
    showLabelsLoading();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a button to open the labels once the pdf is ready', async () => {
    fetchLabelPdf.mockResolvedValueOnce({pending: true}).mockResolvedValueOnce({data: 'cGRm'});

    const promise = print('open');

    expect(labelsNotification()?.loading).toBe(true);

    await vi.advanceTimersByTimeAsync(5000);
    await promise;

    const notification = labelsNotification();

    expect(notification?.loading).toBeFalsy();
    expect(notification?.variant).toBe(Variant.Success);
    expect(openUrlInNewTab).not.toHaveBeenCalled();

    notification?.action?.onClick();

    expect(openUrlInNewTab).toHaveBeenCalledWith('blob:labels');
    expect(labelsNotification()).toBeUndefined();
  });

  it('downloads the pdf once it is ready when the output is download', async () => {
    fetchLabelPdf.mockResolvedValueOnce({data: 'cGRm'});

    await print('download');

    expect(downloadFileFromUrl).toHaveBeenCalledWith('blob:labels', 'myparcel-labels.pdf');
    expect(labelsNotification()).toBeUndefined();
  });

  it('shows an error when the pdf is not ready in time', async () => {
    fetchLabelPdf.mockResolvedValue({pending: true});

    const promise = print('open');

    await vi.advanceTimersByTimeAsync(11 * 60 * 1000);
    await promise;

    const notification = labelsNotification();

    expect(notification?.variant).toBe(Variant.Error);
    expect(notification?.loading).toBeFalsy();
    expect(notification?.action).toBeUndefined();
  });
});

describe('openOrPrintPdf without a response', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    showLabelsLoading();
  });

  it('removes the loading notification when the print request failed', async () => {
    // @ts-expect-error the handler returns nothing when the request failed
    await openOrPrintPdf({response: undefined, parameters: {orderIds: ['1']}});

    expect(labelsNotification()).toBeUndefined();
  });
});
