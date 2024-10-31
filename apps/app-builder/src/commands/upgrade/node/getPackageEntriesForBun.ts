import {type ParsedEntry, type PdkBuilderUpgradeContext} from '../upgrade.types';
import {executeCommand} from '../../../utils/executeCommand';

export async function getPackageEntriesForBun(
  context: PdkBuilderUpgradeContext,
  resolvedPackageName: string,
): Promise<ParsedEntry[]> {
  const content = await executeCommand(context, context.config.nodePackageManagerCommand, ['pm', 'ls', '--all'], {
    stdio: 'pipe',
  });

  return content
    .split('\n')
    .filter((line) => line.includes('@') && new RegExp(resolvedPackageName).test(line))
    .map((line) => {
      const regex = new RegExp(`\\s(${resolvedPackageName})@(.*)`);

      const [, name, version] = regex.exec(line) ?? [];

      return {name, version};
    });
}
