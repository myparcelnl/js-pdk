import {type Plugin} from '@myparcel-pdk/admin';
import {type OneOrMore} from '@myparcel/ts-utils';
import {useDemoProductData} from './useDemoProductData';

export const useDemoProduct = (productId: OneOrMore<string>): Plugin.ModelPdkProduct => {
  const product = useDemoProductData().find((product) => product.externalIdentifier === productId);

  if (!product) {
    throw new Error(`Product with id "${productId}" not found`);
  }

  return product;
};
