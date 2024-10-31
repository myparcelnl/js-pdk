import {describe, expect, it} from 'vitest';
import {createTestContext} from '../../__tests__/createTestContext';
import {createCommand} from './createCommand';

describe('createCommand', () => {
  it.each([
    ['foo', 'foo'],
    ['foo bar', 'foo bar'],
    [['foo'], 'foo'],
    [['foo', 'bar'], 'foo bar'],
    [['foo', 'bar', 'baz'], 'foo bar baz'],
  ])('should return the command as a string', (command, expected) => {
    const context = createTestContext();

    expect(createCommand(context.config, command)).toEqual(expected);
  });

  it('should prepend the command with the root command', () => {
    const context = createTestContext({
      config: {
        dockerCommand: 'root command',
        dockerCommands: ['foo'],
      },
    });

    expect(createCommand(context.config, 'foo')).toEqual('root command foo');
  });

  it('should not prepend the command with the root command when the command is not in the dockerCommands array', () => {
    const context = createTestContext({
      config: {
        dockerCommand: 'root command',
        dockerCommands: [],
      },
    });

    expect(createCommand(context.config, 'bar')).toEqual('bar');
  });
});
