/* eslint-disable @typescript-eslint/no-explicit-any,no-console */

export enum LogLevel {
  ERROR = 4,
  WARN = 3,
  INFO = 2,
  DEBUG = 1,
}

const colors = {
  [LogLevel.DEBUG]: '#9E9E9E',
  [LogLevel.INFO]: '#2196F3',
  [LogLevel.WARN]: '#FFB562',
  [LogLevel.ERROR]: '#F87474',
};

interface Logger {
  level: LogLevel;

  debug: (...messages: any[]) => void;
  error: (...messages: any[]) => void;
  info: (...messages: any[]) => void;
  warn: (...messages: any[]) => void;

  log: (msg: string, css: string[], ...messages: any[]) => void;
}

export const logger: Logger = {
  level: LogLevel.DEBUG,

  log(msg: string, css: string[], ...messages: any[]): void {
    console.log(
      `%cMyParcel%c${msg}`,
      ['background: #0F5C47', 'border-radius: 3px 0 0 3px', 'color: #ccc', 'padding: 2px 4px'].join(';'),
      ['border-radius: 0 3px 3px 0', 'padding: 2px 4px', 'color: #222', ...css].join(';'),
      ...messages,
    );
  },

  debug(...messages: any[]): void {
    if (this.level > LogLevel.DEBUG) {
      return;
    }

    logger.log('DEBUG', [`background:${colors[LogLevel.DEBUG]}`], ...messages);
  },

  info(...messages: any[]): void {
    if (this.level > LogLevel.INFO) {
      return;
    }

    logger.log('INFO', [`background:${colors[LogLevel.INFO]}`], ...messages);
  },

  warn(...messages: any[]): void {
    if (this.level > LogLevel.WARN) {
      return;
    }

    logger.log('WARN', [`background:${colors[LogLevel.WARN]}`], ...messages);
  },

  error(...messages: any[]): void {
    if (this.level > LogLevel.ERROR) {
      return;
    }

    logger.log('ERROR', [`background:${colors[LogLevel.ERROR]}`], ...messages);
  },
};
