import {useLanguage} from '../language/useLanguage';
import {useGlobalContext} from '../context/useGlobalContext';
import {useFormatter} from './useFormatter';
import {type Formatter} from './formatter.types';

export const useLocalizedFormatter = (): Formatter => {
  const globalContext = useGlobalContext();
  const {translate} = useLanguage();

  return useFormatter(globalContext.language, translate);
};
