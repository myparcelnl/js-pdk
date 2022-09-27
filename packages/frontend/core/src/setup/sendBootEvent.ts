import {GlobalPdkFrontend} from './initializePdkFrontend';

export const sendBootEvent = (pdkFrontend: GlobalPdkFrontend): void => {
  const globalContext = pdkFrontend.config.context.global;

  if (!globalContext) {
    throw new Error('Global context not found');
  }

  document.dispatchEvent(new CustomEvent(globalContext.event, {detail: pdkFrontend}));
};
