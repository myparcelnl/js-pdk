import {EndpointName} from '@myparcel-pdk/common';
import {PdkContextObject} from '@myparcel-pdk/frontend-core';

export const context: PdkContextObject = {
  orderIdentifier: '',
  global: {
    baseUrl: 'http://localhost',
    bootId: 'myparcel-pdk-boot',
    endpoints: Object.keys(EndpointName).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          body: '',
          headers: [],
          method: '',
          parameters: {
            action: key,
          },
          path: '',
          property: '',
        },
      }),
      {} as PdkContextObject['global']['endpoints'],
    ),
    event: '',
    language: 'en',
    mode: 'development',
    pluginSettings: {
      carrier: [],
      order: {
        emptyDigitalStampWeight: 0,
        emptyParcelWeight: 0,
        ignoreOrderStatuses: '',
        orderStatusMail: true,
        saveCustomerAddress: true,
        sendNotificationAfter: 'true',
        sendOrderStateForDigitalStamps: true,
        statusOnLabelCreate: 'true',
        statusWhenDelivered: 'true',
        statusWhenLabelScanned: 'true',
      },
      checkout: {
        deliveryOptionsCustomCss: '',
        deliveryOptionsDisplay: true,
        deliveryOptionsPosition: '',
        pickupLocationsDefaultView: '',
        priceType: '',
        showDeliveryDay: true,
        showPriceAsSurcharge: true,
        useSeparateAddressFields: true,
        stringAddressNotFound: '',
        stringCountry: '',
        stringCity: '',
        stringDelivery: '',
        stringDiscount: '',
        stringEveningDelivery: '',
        stringFrom: '',
        stringHouseNumber: '',
        stringLoadMore: '',
        stringMorningDelivery: '',
        stringOnlyRecipient: '',
        stringOpeningHours: '',
        stringPickupLocationsListButton: '',
        stringPickupLocationsMapButton: '',
        stringPickup: '',
        stringPostalCode: '',
        stringRecipient: '',
        stringRetry: '',
        stringSaturdayDelivery: '',
        stringSignature: '',
        stringStandardDelivery: '',
        stringWrongNumberPostalCode: '',
        stringWrongPostalCodeCity: '',
      },
      customs: {
        countryOfOrigin: 'countryOfOrigin',
        customsCode: 'customsCode',
        packageContents: 'packageContents',
      },
      general: {
        apiKey: '',
        apiLogging: true,
        barcodeInNote: true,
        conceptShipments: true,
        exportWithAutomaticStatus: '',
        orderMode: false,
        processDirectly: true,
        shareCustomerInformation: true,
        trackTraceInAccount: true,
        trackTraceInEmail: true,
      },
      label: {
        description: '',
        format: '',
        output: '',
        position: 1,
        prompt: true,
      },
    },
    translations: {},
  },
  // orderData: [
  //   {
  //     externalIdentifier: '3',
  //     // customsDeclaration: {
  //     //   contents: 1,
  //     //   invoice: undefined,
  //     //   items: [],
  //     //   weight: 0,
  //     // },
  //     deliveryOptions: {
  //       carrier: undefined,
  //       date: undefined,
  //       deliveryType: undefined,
  //       labelAmount: 1,
  //       packageType: 'package',
  //       pickupLocation: undefined,
  //       shipmentOptions: {
  //         ageCheck: undefined,
  //         insurance: undefined,
  //         labelDescription: undefined,
  //         largeFormat: undefined,
  //         onlyRecipient: undefined,
  //         return: undefined,
  //         sameDayDelivery: undefined,
  //         signature: undefined,
  //       },
  //     },
  //     recipient: {
  //       cc: 'US',
  //       city: 'Miami',
  //       company: 'My Company',
  //       email: 'admin@prestashop.dev.myparcel.nl',
  //       fullStreet: '16, Main street 2nd floor',
  //       number: undefined,
  //       numberSuffix: undefined,
  //       person: 'John DOE',
  //       phone: '0102030405',
  //       postalCode: '33133',
  //       region: 'Florida',
  //       state: undefined,
  //       street: '16, Main street 2nd floor',
  //       streetAdditionalInfo: undefined,
  //     },
  //     sender: {
  //       cc: undefined,
  //       city: undefined,
  //       company: undefined,
  //       email: undefined,
  //       fullStreet: undefined,
  //       number: undefined,
  //       numberSuffix: undefined,
  //       person: undefined,
  //       phone: undefined,
  //       postalCode: undefined,
  //       region: undefined,
  //       state: undefined,
  //       street: undefined,
  //       streetAdditionalInfo: undefined,
  //     },
  //     shipments: [
  //       {
  //         id: 3,
  //         referenceIdentifier: '3',
  //         externalIdentifier: undefined,
  //         apiKey: undefined,
  //         barcode: undefined,
  //         carrier: undefined,
  //         collectionContact: undefined,
  //         created: undefined,
  //         createdBy: undefined,
  //         customsDeclaration: undefined,
  //         delayed: false,
  //         delivered: false,
  //         deliveryOptions: {
  //           carrier: undefined,
  //           date: undefined,
  //           deliveryType: undefined,
  //           labelAmount: 1,
  //           packageType: 'package',
  //           pickupLocation: undefined,
  //           shipmentOptions: {
  //             ageCheck: undefined,
  //             insurance: undefined,
  //             labelDescription: undefined,
  //             largeFormat: undefined,
  //             onlyRecipient: undefined,
  //             return: undefined,
  //             sameDayDelivery: undefined,
  //             signature: undefined,
  //           },
  //         },
  //         dropOffPoint: undefined,
  //         isReturn: false,
  //         linkConsumerPortal: undefined,
  //         modified: undefined,
  //         modifiedBy: undefined,
  //         multiCollo: false,
  //         multiColloMainShipmentId: undefined,
  //         partnerTrackTraces: undefined,
  //         physicalProperties: {
  //           height: undefined,
  //           length: undefined,
  //           weight: 0,
  //           width: undefined,
  //         },
  //         recipient: {
  //           cc: 'US',
  //           city: 'Miami',
  //           fullStreet: '16, Main street 2nd floor',
  //           number: undefined,
  //           numberSuffix: undefined,
  //           postalCode: '33133',
  //           region: 'Florida',
  //           state: undefined,
  //           street: '16, Main street 2nd floor',
  //           streetAdditionalInfo: undefined,
  //           email: 'admin@prestashop.dev.myparcel.nl',
  //           phone: '0102030405',
  //           person: 'John DOE',
  //           company: 'My Company',
  //         },
  //         sender: {
  //           cc: undefined,
  //           city: undefined,
  //           company: undefined,
  //           email: undefined,
  //           fullStreet: undefined,
  //           number: undefined,
  //           numberSuffix: undefined,
  //           person: undefined,
  //           phone: undefined,
  //           postalCode: undefined,
  //           region: undefined,
  //           state: undefined,
  //           street: undefined,
  //           streetAdditionalInfo: undefined,
  //         },
  //         shopId: undefined,
  //         status: undefined,
  //         updated: undefined,
  //       },
  //     ],
  //   },
  // ],
};