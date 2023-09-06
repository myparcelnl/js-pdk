import {afterAll, afterEach, describe, expect, it, vi} from 'vitest';
import {createLogger, globalLogger, LogLevel, type PdkLogger} from './logger';

type ExtractRecord<T extends Record<any, any>, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
};

type ExtractRecordKeys<T extends Record<any, any>, U> = ExtractRecord<T, U>[keyof T];

type PdkLoggerMethod = ExtractRecordKeys<PdkLogger, (...args: any[]) => void>;

describe('logger', () => {
  const spies = {
    log: vi.spyOn(console, 'log'),
    warn: vi.spyOn(console, 'warn'),
    error: vi.spyOn(console, 'error'),
  };

  const logMethodsMap = [
    ['debug', 'log'],
    ['info', 'log'],
    ['warn', 'warn'],
    ['error', 'error'],
  ] as [PdkLoggerMethod, keyof typeof spies][];

  afterEach(() => {
    Object.values(spies).forEach((spy) => spy.mockReset());
  });

  afterAll(() => {
    Object.values(spies).forEach((spy) => spy.mockRestore());
  });

  describe('global', () => {
    it.each(logMethodsMap)('can use %s', (method, consoleMethod) => {
      globalLogger[method]('test');

      expect(spies[consoleMethod]).toHaveBeenCalledTimes(1);
    });
  });

  describe('scoped', () => {
    it.each(logMethodsMap)('can use %s', (method, consoleMethod) => {
      const logger = createLogger('test');

      logger[method]('test');

      expect(spies[consoleMethod]).toHaveBeenCalledTimes(1);
    });

    it.each([
      {logLevel: LogLevel.Off, logs: 0, warns: 0, errors: 0},
      {logLevel: LogLevel.Error, logs: 0, warns: 0, errors: 1},
      {logLevel: LogLevel.Warn, logs: 0, warns: 1, errors: 1},
      {logLevel: LogLevel.Info, logs: 1, warns: 1, errors: 1},
      {logLevel: LogLevel.Debug, logs: 2, warns: 1, errors: 1},
    ])('honors log level $logLevel', ({logLevel, logs, warns, errors}) => {
      const logger = createLogger('test', logLevel);

      logger.debug('debug');
      logger.info('info');
      logger.warn('warn');
      logger.error('error');

      expect(spies.log).toHaveBeenCalledTimes(logs);
      expect(spies.warn).toHaveBeenCalledTimes(warns);
      expect(spies.error).toHaveBeenCalledTimes(errors);
    });
  });
});
