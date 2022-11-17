/* eslint-disable @typescript-eslint/no-explicit-any,no-console */
const style = (...styles: string[]): string => ['border-radius: 0 3px 3px 0', 'padding: 2px 4px', ...styles].join(';');

const baseLog = (msg: string, css: string[], ...messages: any[]) => {
  // if (import.meta.env.PROD) {
  //   return;
  // }

  console.log(
    `%cMyParcel%c${msg}`,
    ['background: #0F5C47', 'border-radius: 3px 0 0 3px', 'color: #fff', 'padding: 2px 4px'].join(';'),
    style(...css),
    ...messages,
  );
};

export const logDebug = (...messages: any[]): void => {
  baseLog('DEBUG', ['background: #F9F2ED', 'color: #222'], ...messages);
};

export const logSuccess = (...messages: any[]): void => {
  baseLog('SUCCESS', ['background: #3AB0FF', 'color: #222'], ...messages);
};

export const logWarning = (...messages: any[]): void => {
  baseLog('WARN', ['background: #FFB562', 'color: #222'], ...messages);
};

export const logError = (...messages: any[]): void => {
  baseLog('ERROR', ['background: #F87474', 'color: #222'], ...messages);
};
