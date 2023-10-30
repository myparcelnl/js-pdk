import {type AnyCommandArgs, type PdkBuilderContext} from '../types';

export const withArgs = <Args1 extends AnyCommandArgs, Args2 extends AnyCommandArgs>(
  context: PdkBuilderContext<Args2>,
  args: Args1,
): PdkBuilderContext<Args1 & Args2> => ({
  ...context,
  args: {...context.args, ...args},
});
