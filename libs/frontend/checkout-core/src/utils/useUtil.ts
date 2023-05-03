export enum Util {
  CreateStore = 'createStore',
  DoRequest = 'doRequest',
  FieldsEqual = 'fieldsEqual',
  GetAddressField = 'getAddressField',
  GetAddressFieldValue = 'getAddressFieldValue',
  GetElement = 'getElement',
  GetFieldValue = 'getFieldValue',
  IsOfType = 'isOfType',
  SetFieldValue = 'setFieldValue',
  TriggerEvent = 'triggerEvent',
}

export const useUtil: MyParcelPdk['useUtil'] = (name) => window.MyParcelPdk.useUtil(name);
