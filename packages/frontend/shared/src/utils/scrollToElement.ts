import {isOfType} from './type-guard';

/**
 * Scrolls to element with given selector.
 */
export function scrollToElement(selector?: string): void {
  if (!selector) {
    return;
  }

  const element = document.querySelector(selector);

  if (!element || !isOfType<HTMLElement>(element, 'offsetTop')) {
    throw new Error(`Element not found or invalid: ${selector}`);
  }

  // TODO remove jquery
  const $: any = {};

  $([document.documentElement, document.body]).animate({
    scrollTop: $(selector).scrollTop(),
  });
}
