import {type MyParcelPdk} from '../types/global.types';

export const realUseUtil: MyParcelPdk['useUtil'] = (name) => {
  const util = window.MyParcelPdk?.utils?.[name];

  if (!util) {
    throw new Error(`Util "${name}" not found.`);
  }

  return util;
};
