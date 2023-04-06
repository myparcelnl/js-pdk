/* eslint-disable @typescript-eslint/no-explicit-any,no-console */

export enum LogLevel {
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Off = 5,
}

const logLevelNameMap: Partial<Record<LogLevel, string>> = {
  [LogLevel.Error]: 'error',
  [LogLevel.Warn]: 'warn',
  [LogLevel.Info]: 'info',
  [LogLevel.Debug]: 'debug',
};

const backgroundColors: Partial<Record<LogLevel, string>> = {
  [LogLevel.Debug]: '#9E9E9E',
  [LogLevel.Info]: '#2196F3',
  [LogLevel.Warn]: '#FFB562',
  [LogLevel.Error]: '#F87474',
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
  level: LogLevel.Debug,

  scope: null,

  log(level: LogLevel, ...messages: any[]): void {
    if (level < this.level) {
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
        case LogLevel.Error:
          method = console.error;
          break;

        case LogLevel.Warn:
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
    this.log(LogLevel.Debug, ...messages);
  },

  info(...messages: any[]): void {
    this.log(LogLevel.Info, ...messages);
  },

  warn(...messages: any[]): void {
    this.log(LogLevel.Warn, ...messages);
  },

  error(...messages: any[]): void {
    this.log(LogLevel.Error, ...messages);
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
