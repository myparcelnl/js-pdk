import {Formatter} from './formatter.types';
import {useGlobalContext} from '../context';
import {useFormatter} from './useFormatter';

export const useLocalizedFormatter = (): Formatter => {
  const globalContext = useGlobalContext();

  return useFormatter(globalContext.language);
};
