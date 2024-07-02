import {useSettings} from './useSettings';

export const getEnabledShippingMethods = (): string[] => {
  const settings = useSettings();
  // No need to filter keys, 0 (off) is not included in the object
  const entries = Object.entries(settings.allowedShippingMethods);

  return entries.flatMap(([, value]) => value);
};
