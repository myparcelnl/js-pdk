import {afterEach, describe, expect, it, vi} from 'vitest';
import {mockLinkElement} from '../__tests__/utils/mockLinkElement';
import {openUrlInNewTab} from './openUrlInNewTab';

/**
 * @vitest-environment happy-dom
 */

describe('openUrlInNewTab', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a fake link, sets attributes, clicks it, and removes it', () => {
    const {createElementSpy, appendChildSpy, mockElement} = mockLinkElement();

    const url = 'https://example.com';

    openUrlInNewTab(url);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockElement);
    expect(mockElement.setAttribute).toHaveBeenCalledWith('href', url);
    expect(mockElement.setAttribute).toHaveBeenCalledWith('target', '_blank');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('rel', 'noopener noreferrer');
    expect(mockElement.click).toHaveBeenCalledOnce();
    expect(mockElement.remove).toHaveBeenCalledOnce();
  });
});
