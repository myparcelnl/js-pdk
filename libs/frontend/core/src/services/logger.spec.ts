import {LogLevel, createLogger, globalLogger} from './logger';
import {afterAll, afterEach, describe, expect, it, vi} from 'vitest';

describe('logger', () => {
  const logSpy = vi.spyOn(console, 'log');

  afterEach(() => {
    logSpy.mockClear();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('can use the global logger', () => {
    globalLogger.error('test');

    expect(logSpy).toHaveBeenCalledWith('ERROR', ['background:#F44336'], 'test');
  });

  it('can use a scoped logger', () => {
    const logger = createLogger('test');

    logger.debug('test');

    expect(logSpy).toHaveBeenCalledWith('DEBUG', ['background:#4CAF50'], 'test');
  });

  it.each([
    {logLevel: LogLevel.OFF, amountOfLogs: 0},
    {logLevel: LogLevel.ERROR, amountOfLogs: 1},
    {logLevel: LogLevel.WARN, amountOfLogs: 2},
    {logLevel: LogLevel.INFO, amountOfLogs: 3},
    {logLevel: LogLevel.DEBUG, amountOfLogs: 4},
  ])('honors log levels', ({logLevel, amountOfLogs}) => {
    const logger = createLogger('test', logLevel);

    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');

    expect(logSpy).toHaveBeenCalledTimes(amountOfLogs);
  });
});
