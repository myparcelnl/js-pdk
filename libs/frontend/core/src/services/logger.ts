/* eslint-disable @typescript-eslint/no-explicit-any,no-console */

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  OFF = 5,
}

const logLevelNameMap: Partial<Record<LogLevel, string>> = {
  [LogLevel.ERROR]: 'error',
  [LogLevel.WARN]: 'warn',
  [LogLevel.INFO]: 'info',
  [LogLevel.DEBUG]: 'debug',
};

const backgroundColors: Partial<Record<LogLevel, string>> = {
  [LogLevel.DEBUG]: '#9E9E9E',
  [LogLevel.INFO]: '#2196F3',
  [LogLevel.WARN]: '#FFB562',
  [LogLevel.ERROR]: '#F87474',
};

export interface PdkLogger {
  level: LogLevel;
  scope: string | null;

  debug: (...messages: any[]) => void;
  error: (...messages: any[]) => void;
  info: (...messages: any[]) => void;
  warn: (...messages: any[]) => void;

  log: (level: LogLevel, ...messages: any[]) => void;

  setScope(scope: string | null): void;
}

export const globalLogger: PdkLogger = {
  level: LogLevel.DEBUG,

  scope: null,

  log(level: LogLevel, ...messages: any[]): void {
    if (level > this.level) {
      return;
    }

    const scope = this.scope ?? 'PDK';

    if (process.env.NODE_ENV === 'production') {
      console.log(`[${scope}] ${level}`, ...messages);
    } else {
      const background = this.scope ? '#002621' : '#0F5C47';
      const levelName = logLevelNameMap[level];
      let method;

      // define console method based on level
      switch (level) {
        case LogLevel.ERROR:
          method = console.error;
          break;

        case LogLevel.WARN:
          method = console.warn;
          break;

        default:
          method = console.log;
      }

      method(
        ...[
          `%c${scope}%c${levelName?.toUpperCase()}`,
          [`background: ${background}`, 'border-radius: 3px 0 0 3px', 'padding: 2px 4px', 'color: #ccc'].join(';'),
          [
            `background: ${backgroundColors[level]}`,
            'border-radius: 0 3px 3px 0',
            'padding: 2px 4px',
            'color: #222',
          ].join(';'),
          ...messages,
        ],
      );
    }
  },

  debug(...messages: any[]): void {
    this.log(LogLevel.DEBUG, ...messages);
  },

  info(...messages: any[]): void {
    this.log(LogLevel.INFO, ...messages);
  },

  warn(...messages: any[]): void {
    this.log(LogLevel.WARN, ...messages);
  },

  error(...messages: any[]): void {
    this.log(LogLevel.ERROR, ...messages);
  },

  setScope(scope: string | null): void {
    this.scope = scope;
  },
};

export const createLogger = (scope: string | null = null, logLevel: LogLevel | null = null): PdkLogger => {
  const loggerInstance = {...globalLogger};
  loggerInstance.setScope(scope);
  loggerInstance.level = logLevel ?? globalLogger.level;

  return loggerInstance;
};
