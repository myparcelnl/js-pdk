import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type PdkBuilderContext} from '../../types/command.types';
import {createDirectory} from './createDirectory';

export const createDirectories = async (context: PdkBuilderContext, paths: OneOrMore<string>): Promise<void> => {
  await Promise.all(toArray(paths).map((item) => createDirectory(context, item)));
};
