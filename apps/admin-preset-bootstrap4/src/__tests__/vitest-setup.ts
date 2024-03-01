import {beforeEach, vi} from 'vitest';

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (global.jQuery) {
    return;
  }

  Object.defineProperty(global, 'jQuery', {
    value: vi.fn(() => ({
      dropdown: vi.fn(),
      modal: vi.fn(),
      off: vi.fn(),
      on: vi.fn(),
      once: vi.fn(),
      popover: vi.fn(),
      tooltip: vi.fn(),
      trigger: vi.fn(),
    })),
  });
});
