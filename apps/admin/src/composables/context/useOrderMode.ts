import {type OrderMode, resolveOrderMode} from '../../data';
import {useContext} from './useContext';

const ORDER_V1_KEY = 'orderV1';
const ORDER_V2_KEY = 'orderV2';

export const useOrderMode = (): OrderMode => {
  const context = useContext();
  const {generalSettings} = context.account;

  const orderMode = resolveOrderMode(generalSettings[ORDER_V1_KEY] ?? false, generalSettings[ORDER_V2_KEY] ?? false);

  // eslint-disable-next-line no-console
  console.info('[OrderMode] resolved:', orderMode);

  return orderMode;
};
