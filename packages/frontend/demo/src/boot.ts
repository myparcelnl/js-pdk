import App from './App.vue';
import {INJECT_GLOBAL_PDK_FRONTEND} from '@myparcel/pdk-frontend/src/data/injections';
import {InputPdkConfiguration} from '@myparcel/pdk-frontend/src/setup/config/types';
import {VueQueryPlugin} from 'vue-query';
import {createApp} from 'vue';
import {createPdkFrontend} from '@myparcel/pdk-frontend/src/main';

export const boot = (initialConfig: InputPdkConfiguration): void => {
  const div = document.createElement('div');
  div.setAttribute('id', 'myparcel-core-bootstrap');

  // const context = {};

  const context: PdkContextObject = {
    pluginSettings: {},
    orderIdentifier: '',
    global: {
      baseUrl: 'https://prestashop.dev.myparcel.nl/admin1/index.php/modules/myparcelbe/pdk',
      bootstrapId: 'myparcel-core-bootstrap',
      event: '',
      translations: {},
      endpoints: {
        exportOrder: {
          body: '',
          headers: {},
          httpMethod: 'GET',
          path: '',
          parameters: {
            action: 'exportOrder',
          },
          queryString: '',
        },
        exportPrintOrder: {
          body: '',
          headers: {},
          httpMethod: 'GET',
          path: '',
          parameters: {
            action: 'exportPrintOrder',
          },
          queryString: '',
        },
        getOrderData: {
          body: '',
          headers: {},
          httpMethod: 'GET',
          path: '',
          parameters: {
            action: 'getOrderData',
          },
          queryString: '',
        },
      },
    },
    orderData: [
      {
        externalIdentifier: '3',
        // customsDeclaration: {
        //   contents: 1,
        //   invoice: undefined,
        //   items: [],
        //   weight: 0,
        // },
        deliveryOptions: {
          carrier: undefined,
          date: undefined,
          deliveryType: undefined,
          labelAmount: 1,
          packageType: 'package',
          pickupLocation: undefined,
          shipmentOptions: {
            ageCheck: undefined,
            insurance: undefined,
            labelDescription: undefined,
            largeFormat: undefined,
            onlyRecipient: undefined,
            return: undefined,
            sameDayDelivery: undefined,
            signature: undefined,
          },
        },
        recipient: {
          cc: 'US',
          city: 'Miami',
          company: 'My Company',
          email: 'admin@prestashop.dev.myparcel.nl',
          fullStreet: '16, Main street 2nd floor',
          number: undefined,
          numberSuffix: undefined,
          person: 'John DOE',
          phone: '0102030405',
          postalCode: '33133',
          region: 'Florida',
          state: undefined,
          street: '16, Main street 2nd floor',
          streetAdditionalInfo: undefined,
        },
        sender: {
          cc: undefined,
          city: undefined,
          company: undefined,
          email: undefined,
          fullStreet: undefined,
          number: undefined,
          numberSuffix: undefined,
          person: undefined,
          phone: undefined,
          postalCode: undefined,
          region: undefined,
          state: undefined,
          street: undefined,
          streetAdditionalInfo: undefined,
        },
        shipments: [
          {
            id: 3,
            referenceIdentifier: '3',
            externalIdentifier: undefined,
            apiKey: undefined,
            barcode: undefined,
            carrier: undefined,
            collectionContact: undefined,
            created: undefined,
            createdBy: undefined,
            customsDeclaration: undefined,
            delayed: undefined,
            delivered: undefined,
            deliveryOptions: {
              carrier: undefined,
              date: undefined,
              deliveryType: undefined,
              labelAmount: 1,
              packageType: 'package',
              pickupLocation: undefined,
              shipmentOptions: {
                ageCheck: undefined,
                insurance: undefined,
                labelDescription: undefined,
                largeFormat: undefined,
                onlyRecipient: undefined,
                return: undefined,
                sameDayDelivery: undefined,
                signature: undefined,
              },
            },
            dropOffPoint: undefined,
            isReturn: undefined,
            linkConsumerPortal: undefined,
            modified: undefined,
            modifiedBy: undefined,
            multiCollo: false,
            multiColloMainShipmentId: undefined,
            partnerTrackTraces: undefined,
            physicalProperties: {
              height: undefined,
              length: undefined,
              weight: 0,
              width: undefined,
            },
            recipient: {
              cc: 'US',
              city: 'Miami',
              fullStreet: '16, Main street 2nd floor',
              number: undefined,
              numberSuffix: undefined,
              postalCode: '33133',
              region: 'Florida',
              state: undefined,
              street: '16, Main street 2nd floor',
              streetAdditionalInfo: undefined,
              email: 'admin@prestashop.dev.myparcel.nl',
              phone: '0102030405',
              person: 'John DOE',
              company: 'My Company',
            },
            sender: {
              cc: undefined,
              city: undefined,
              company: undefined,
              email: undefined,
              fullStreet: undefined,
              number: undefined,
              numberSuffix: undefined,
              person: undefined,
              phone: undefined,
              postalCode: undefined,
              region: undefined,
              state: undefined,
              street: undefined,
              streetAdditionalInfo: undefined,
            },
            shopId: undefined,
            status: undefined,
            updated: undefined,
          },
        ],
      },
    ],
  };

  div.setAttribute('data-core-context', JSON.stringify(context));

  document.body.appendChild(div);

  const app = createApp(App);

  app.use(VueQueryPlugin);

  const pdkFrontend = createPdkFrontend(initialConfig);

  app.provide(INJECT_GLOBAL_PDK_FRONTEND, pdkFrontend);

  app.mount('#app');
};
