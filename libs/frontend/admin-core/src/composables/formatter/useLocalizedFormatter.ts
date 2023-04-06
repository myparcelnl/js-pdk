import {Formatter} from './formatter.types';
import {useFormatter} from './useFormatter';
import {useGlobalContext} from '../context';
import {useLanguage} from '../translations';

export const useLocalizedFormatter = (): Formatter => {
  const globalContext = useGlobalContext();
  const {translate} = useLanguage();

  return useFormatter(globalContext.language, translate);
};
