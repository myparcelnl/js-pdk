import {type OrderMode, SubscriptionFeature, resolveOrderMode} from '../../data';
import {useContext} from './useContext';

export const useOrderMode = (): OrderMode => {
  const context = useContext();
  const {subscriptionFeatures} = context.account;

  const orderV1 = subscriptionFeatures.includes(SubscriptionFeature.LegacyOrderManagement);
  const orderV2 = subscriptionFeatures.includes(SubscriptionFeature.OrderManagement);

  const orderMode = resolveOrderMode(orderV1, orderV2);

  // eslint-disable-next-line no-console
  console.info('[OrderMode] resolved:', orderMode);

  return orderMode;
};
