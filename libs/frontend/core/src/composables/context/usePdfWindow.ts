import {Ref, UnwrapRef, ref} from 'vue';
import {useContextStore} from '../../stores';

let pdfWindow: Ref<UnwrapRef<Window | null>>;

type UsePdfWindow = () => {
  pdfWindow: typeof pdfWindow;
  open: () => Promise<void>;
  close: () => void;
  navigate: (href: string) => void;
};

/**
 * Keeps a reference to a window.
 */
// eslint-disable-next-line max-lines-per-function
export const usePdfWindow: UsePdfWindow = () => {
  const open: ReturnType<UsePdfWindow>['open'] = async () => {
    return new Promise((resolve) => {
      pdfWindow ??= ref<Window | null>(null);

      const contextStore = useContextStore();
      const endpoints = contextStore.context.global?.endpoints;

      if (!endpoints) {
        return;
      }

      // todo loading window
      const newWindow = window.open('about:blank', '_blank');

      if (!newWindow) {
        throw new Error('Failed to create new window.');
      }

      newWindow.onload = (): void => {
        pdfWindow.value = newWindow;

        window.focus();
        pdfWindow.value?.blur();
        pdfWindow.value.onclose = close;

        resolve();
      };
    });
  };

  const close: ReturnType<UsePdfWindow>['close'] = () => {
    if (!pdfWindow?.value) {
      return;
    }

    pdfWindow.value.close();
    pdfWindow.value = null;
  };

  const navigate: ReturnType<UsePdfWindow>['navigate'] = (href) => {
    if (!pdfWindow?.value) {
      return;
    }

    pdfWindow.value.location.assign(href);
  };

  return {
    pdfWindow,
    open,
    close,
    navigate,
  };
};
