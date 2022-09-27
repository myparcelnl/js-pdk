<template>
  <div
    id="myparcel-pdk-bootstrap"
    :data-pdk-context="context"></div>

  <div class="flex flex-col min-h-full">
    <header class="bg-emerald-900 flex-grow p-5">
      <h1 class="font-bold text-xl">MyParcel</h1>
    </header>

    <div class="flex">
      <aside class="bg-gray-50 p-5">sidebar</aside>

      <div class="flex flex-col flex-grow">
        <div class="">
          <div id="mypa-after-header"></div>
        </div>

        <main class="flex p-5">
          <div class="max-w-screen-2xl mx-auto w-full">
            <table class="table-fixed text-left w-full">
              <tr class="bg-green-900">
                <th class="p-4">Order ID</th>
                <th class="p-4">Recipient</th>
                <th class="p-4">Labels</th>
                <th class="p-4">Actions</th>
              </tr>

              <template
                v-for="(order, index) in orderData"
                :key="`order_${order.externalIdentifier}`">
                <tr
                  :class="{
                    'bg-zinc-900': index % 2 !== 0,
                  }">
                  <td class="p-4">#{{ order.externalIdentifier }}</td>

                  <td class="p-4">{{ order.recipient.fullStreet }}, {{ order.recipient.city }}</td>

                  <td class="p-4">
                    <div
                      :id="`mypa-order-${order.externalIdentifier}`"
                      :data-pdk-context="JSON.stringify(order)"></div>
                  </td>

                  <td class="p-4">
                    <button
                      type="button"
                      @click="() => toggle(order.externalIdentifier)">
                      toggle
                    </button>
                  </td>
                </tr>

                <tr>
                  <div
                    v-for="item in ['mypa-order-card']"
                    v-show="toggled"
                    :key="item">
                    <div :id="item">
                      {{ `#${item}` }}
                    </div>
                  </div>
                </tr>
              </template>
            </table>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'DemoApp',
  setup: (props, ctx) => {
    // const shipmentOptionsContext: ShipmentOptionsContext = {
    //   consignment: {
    //     canHaveAgeCheck: true,
    //     canHaveInsurance: true,
    //     canHaveLargeFormat: true,
    //     canHaveOnlyRecipient: true,
    //     canHaveReturn: true,
    //     canHaveSignature: true,
    //     insuranceOptions: [1000, 5000, 10000, 20000, 30000],
    //   },
    //
    //   deliveryOptions: {
    //     carrier: 'postnl',
    //     date: '',
    //     deliveryType: 'standard',
    //     isPickup: false,
    //     packageType: 'package',
    //     shipmentOptions: {
    //       age_check: true,
    //     },
    //   },
    //
    //   extraOptions: {digitalStampWeight: '23', labelAmount: 1},
    //   labelOptions: {
    //     age_check: true,
    //     insurance: false,
    //     only_recipient: false,
    //     package_format: 'large',
    //     package_type: 1,
    //     return: false,
    //     signature: false,
    //   },
    //
    //   options: {
    //     digitalStampWeight: [
    //       {
    //         value: 5,
    //         label: '5g',
    //       },
    //     ],
    //
    //     packageFormat: [
    //       {
    //         value: 1,
    //         label: 'Large format',
    //       },
    //       {
    //         value: 0,
    //         label: 'Normal',
    //       },
    //     ],
    //
    //     packageType: PACKAGE_TYPES.ALL.map((packageType) => ({
    //       value: packageType.ID,
    //       label: packageType.NAME,
    //     })),
    //   },
    //
    //   orderIdentifier: 1,
    //   orderWeight: 300,
    // };

    // const shipmentLabelsContext: ShipmentLabelsContext = {
    //   labels: [],
    // };

    // fe.renderAfterHeader?.('#mypa-after-header');
    // fe.renderLoadingPage?.('#mypa-loading-page');

    const orderData = [
      {
        externalIdentifier: '3',
        customsDeclaration: {contents: 1, invoice: undefined, items: [], weight: 0},
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
          boxNumber: undefined,
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
          boxNumber: undefined,
          cc: undefined,
          city: undefined,
          fullStreet: undefined,
          number: undefined,
          numberSuffix: undefined,
          postalCode: undefined,
          region: undefined,
          state: undefined,
          street: undefined,
          streetAdditionalInfo: undefined,
          email: undefined,
          phone: undefined,
          person: undefined,
          company: undefined,
        },

        shipments: [
          {
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
            externalIdentifier: undefined,
            id: 4,
            isReturn: undefined,
            linkConsumerPortal: undefined,
            modified: undefined,
            modifiedBy: undefined,
            multiCollo: false,
            multiColloMainShipmentId: undefined,
            partnerTrackTraces: undefined,
            physicalProperties: {height: undefined, length: undefined, weight: 0, width: undefined},
            recipient: {
              boxNumber: undefined,
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

            referenceIdentifier: '4',
            sender: {
              boxNumber: undefined,
              cc: undefined,
              city: undefined,
              fullStreet: undefined,
              number: undefined,
              numberSuffix: undefined,
              postalCode: undefined,
              region: undefined,
              state: undefined,
              street: undefined,
              streetAdditionalInfo: undefined,
              email: undefined,
              phone: undefined,
              person: undefined,
              company: undefined,
            },

            shopId: undefined,
            status: undefined,
            updated: undefined,
          },
        ],
      },
      {
        externalIdentifier: '4',
        customsDeclaration: {contents: 1, invoice: undefined, items: [], weight: 0},
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
          boxNumber: undefined,
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
          boxNumber: undefined,
          cc: undefined,
          city: undefined,
          fullStreet: undefined,
          number: undefined,
          numberSuffix: undefined,
          postalCode: undefined,
          region: undefined,
          state: undefined,
          street: undefined,
          streetAdditionalInfo: undefined,
          email: undefined,
          phone: undefined,
          person: undefined,
          company: undefined,
        },

        shipments: [
          {
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
            externalIdentifier: undefined,
            id: 4,
            isReturn: undefined,
            linkConsumerPortal: undefined,
            modified: undefined,
            modifiedBy: undefined,
            multiCollo: false,
            multiColloMainShipmentId: undefined,
            partnerTrackTraces: undefined,
            physicalProperties: {height: undefined, length: undefined, weight: 0, width: undefined},
            recipient: {
              boxNumber: undefined,
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

            referenceIdentifier: '4',
            sender: {
              boxNumber: undefined,
              cc: undefined,
              city: undefined,
              fullStreet: undefined,
              number: undefined,
              numberSuffix: undefined,
              postalCode: undefined,
              region: undefined,
              state: undefined,
              street: undefined,
              streetAdditionalInfo: undefined,
              email: undefined,
              phone: undefined,
              person: undefined,
              company: undefined,
            },

            shopId: undefined,
            status: undefined,
            updated: undefined,
          },
        ],
      },
    ];

    // orderData.forEach((order) => {
    //   fe?.render('OrderListColumn', `mypa-order-${order.externalIdentifier}`);
    // });

    const toggled = ref<string | null>(null);

    return {
      orderData,
      toggled,

      toggle: (id: string) => {
        toggled.value = toggled.value === id ? null : id;
      },

      context: {
        orderData: [
          {
            externalIdentifier: '3',
            customsDeclaration: {contents: 1, invoice: undefined, items: [], weight: 0},
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
              boxNumber: undefined,
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
              boxNumber: undefined,
              cc: undefined,
              city: undefined,
              fullStreet: undefined,
              number: undefined,
              numberSuffix: undefined,
              postalCode: undefined,
              region: undefined,
              state: undefined,
              street: undefined,
              streetAdditionalInfo: undefined,
              email: undefined,
              phone: undefined,
              person: undefined,
              company: undefined,
            },

            shipments: [
              {
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
                externalIdentifier: undefined,
                id: 4,
                isReturn: undefined,
                linkConsumerPortal: undefined,
                modified: undefined,
                modifiedBy: undefined,
                multiCollo: false,
                multiColloMainShipmentId: undefined,
                partnerTrackTraces: undefined,
                physicalProperties: {height: undefined, length: undefined, weight: 0, width: undefined},
                recipient: {
                  boxNumber: undefined,
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

                referenceIdentifier: '4',
                sender: {
                  boxNumber: undefined,
                  cc: undefined,
                  city: undefined,
                  fullStreet: undefined,
                  number: undefined,
                  numberSuffix: undefined,
                  postalCode: undefined,
                  region: undefined,
                  state: undefined,
                  street: undefined,
                  streetAdditionalInfo: undefined,
                  email: undefined,
                  phone: undefined,
                  person: undefined,
                  company: undefined,
                },

                shopId: undefined,
                status: undefined,
                updated: undefined,
              },
            ],
          },
          {
            externalIdentifier: '4',
            customsDeclaration: {contents: 1, invoice: undefined, items: [], weight: 0},
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
              boxNumber: undefined,
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
              boxNumber: undefined,
              cc: undefined,
              city: undefined,
              fullStreet: undefined,
              number: undefined,
              numberSuffix: undefined,
              postalCode: undefined,
              region: undefined,
              state: undefined,
              street: undefined,
              streetAdditionalInfo: undefined,
              email: undefined,
              phone: undefined,
              person: undefined,
              company: undefined,
            },

            shipments: [
              {
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
                externalIdentifier: undefined,
                id: 4,
                isReturn: undefined,
                linkConsumerPortal: undefined,
                modified: undefined,
                modifiedBy: undefined,
                multiCollo: false,
                multiColloMainShipmentId: undefined,
                partnerTrackTraces: undefined,
                physicalProperties: {height: undefined, length: undefined, weight: 0, width: undefined},
                recipient: {
                  boxNumber: undefined,
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

                referenceIdentifier: '4',
                sender: {
                  boxNumber: undefined,
                  cc: undefined,
                  city: undefined,
                  fullStreet: undefined,
                  number: undefined,
                  numberSuffix: undefined,
                  postalCode: undefined,
                  region: undefined,
                  state: undefined,
                  street: undefined,
                  streetAdditionalInfo: undefined,
                  email: undefined,
                  phone: undefined,
                  person: undefined,
                  company: undefined,
                },

                shopId: undefined,
                status: undefined,
                updated: undefined,
              },
            ],
          },
        ],
      },
    };
  },
});
</script>
