import {LogLevel, createLogger, globalLogger} from './logger';
import {afterAll, afterEach, describe, expect, it, vi} from 'vitest';

describe('logger', () => {
  const spies = {
    log: vi.spyOn(console, 'log'),
    warn: vi.spyOn(console, 'warn'),
    error: vi.spyOn(console, 'error'),
  };

  afterEach(() => {
    Object.values(spies).forEach((spy) => spy.mockReset());
  });

  afterAll(() => {
    Object.values(spies).forEach((spy) => spy.mockRestore());
  });

  it('can use the global logger', () => {
    globalLogger.error('test');

    expect(spies.warn).toHaveBeenCalledTimes(0);
    expect(spies.error).toHaveBeenCalledTimes(0);
    expect(spies.error).toHaveBeenCalledTimes(1);
  });

  it('can use a scoped logger', () => {
    const logger = createLogger('test');

    logger.debug('test');

    expect(spies.log).toHaveBeenCalledTimes(1);
    expect(spies.warn).toHaveBeenCalledTimes(0);
    expect(spies.error).toHaveBeenCalledTimes(0);
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
