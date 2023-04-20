export enum Util {
  CreateStore = 'createStore',
  FieldsEqual = 'fieldsEqual',
  GetAddressField = 'getAddressField',
  GetAddressFieldValue = 'getAddressFieldValue',
  GetElement = 'getElement',
  GetFieldValue = 'getFieldValue',
  GetFrontendContext = 'getFrontendContext',
  HasAddressType = 'hasAddressType',
  IsOfType = 'isOfType',
  SetFieldValue = 'setFieldValue',
  TriggerEvent = 'triggerEvent',
}

/**
 * Pull in a util from the window object.
 */
// @ts-expect-error error comes from global types in other packages
export const useUtil = <N extends Util>(name: N): MyParcelPdkUtils[N] => {
  const util = window.MyParcelPdk?.utils?.[name];

  if (!util) {
    throw new Error(`Util '${name}' not found.`);
  }

  return util;
};
