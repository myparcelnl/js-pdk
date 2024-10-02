import {vi} from 'vitest';

export const mockLinkElement = () => {
  const createElementSpy = vi.spyOn(document, 'createElement');
  const appendChildSpy = vi.spyOn(document.body, 'appendChild');

  const mockElement = document.createElement('a');

  mockElement.setAttribute = vi.fn();
  mockElement.click = vi.fn();
  mockElement.remove = vi.fn();

  createElementSpy.mockReturnValue(mockElement);

  return {
    createElementSpy,
    appendChildSpy,
    mockElement,
  };
};
