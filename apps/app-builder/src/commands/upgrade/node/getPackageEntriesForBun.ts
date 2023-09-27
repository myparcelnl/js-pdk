import {type ParsedEntry, type UpgradeSubContextWithLockfile} from '../types';
import {executeCommand} from '../../../utils';

export async function getPackageEntriesForBun(
  context: UpgradeSubContextWithLockfile,
  resolvedPackageName: string,
): Promise<ParsedEntry[]> {
  const content = await executeCommand(context, context.config.nodePackageManagerCommand, ['pm', 'ls', '--all']);

  return content
    .split('\n')
    .filter((line) => line.includes('@') && new RegExp(resolvedPackageName).test(line))
    .map((line) => {
      const regex = new RegExp(`\\s(${resolvedPackageName})@(.*)`);

      const [, name, version] = regex.exec(line) ?? [];

      return {
        name,
        version,
      };
    });
}
