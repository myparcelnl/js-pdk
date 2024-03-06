import {createWrapperError, DOMWrapper, type VueWrapper} from '@vue/test-utils';

export const wrapperPlugin = (wrapper: VueWrapper): Record<string, any> => {
  const findByTestId = (selector: string | string[]): DOMWrapper<any> => {
    const resolvedSelector = Array.isArray(selector) ? selector.join('--') : selector;

    const dataSelector = `[data-test-id="${resolvedSelector}"]`;
    const element = wrapper.element.querySelector(dataSelector);

    if (element) {
      return new DOMWrapper(element);
    }

    return createWrapperError('DOMWrapper');
  };

  return {
    findByTestId,
  };
};
