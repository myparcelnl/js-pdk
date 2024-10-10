import {afterEach, describe, expect, it, vi} from 'vitest';
import {mockLinkElement} from '../__tests__/utils/mockLinkElement';
import {downloadFileFromUrl} from './downloadFileFromUrl';

/**
 * @vitest-environment happy-dom
 */

describe('downloadFileFromUrl', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a link with correct href and download attributes, clicks it, and removes it', () => {
    const url = 'https://example.com/file.zip';
    const filename = 'file.zip';

    const {createElementSpy, appendChildSpy, mockElement} = mockLinkElement();

    downloadFileFromUrl(url, filename);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('href', url);
    expect(mockElement.setAttribute).toHaveBeenCalledWith('download', filename);
    expect(appendChildSpy).toHaveBeenCalledWith(mockElement);
    expect(mockElement.click).toHaveBeenCalled();
    expect(mockElement.remove).toHaveBeenCalled();
  });
});
