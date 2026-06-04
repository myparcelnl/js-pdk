/**
 * This is a handcrafted file to allow for drift between php-pdk and JS-pdk. Mostly because the `php-pdk.types` is not accurate at this moment.
 */

// @TODO determine how relevant this is after getting capabilities from the API, and if it can be based on the OpenAPI spec later.
export type CarrierModel = {
  carrier: string;
  collo: {max: number};
  deliveryTypes: string[];
  options: {
    insurance?: {
      isRequired: boolean;
      isSelectedByDefault: boolean;
      requires?: string[];
      excludes?: string[];
      insuredAmount: {
        min: {
          amount: number;
          currency: string;
        };
        max: {
          amount: number;
          currency: string;
        };
        default: {
          amount: number;
          currency: string;
        };
      };
    };
  } & Record<
    string,
    {
      isRequired: boolean;
      isSelectedByDefault: boolean;
      /**
       * Other option keys that must also be enabled when this option is enabled. Only populated
       * when the carrier model came from the proxy-capabilities response (`getCarrierForShipment`);
       * absent on contract-definition data (`DynamicContext` / `getCarrierForOrder`).
       */
      requires?: string[];
      /**
       * Other option keys that must NOT be enabled when this option is enabled. Same source
       * constraints as `requires`.
       */
      excludes?: string[];
      [key: string]: unknown;
    }
  >;
  packageTypes: string[];
  transactionTypes: string[];
};

export type CarrierCollection = CarrierModel[];
