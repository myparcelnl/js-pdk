/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/no-namespace,@typescript-eslint/naming-convention */
// noinspection JSUnusedGlobalSymbols

// ⚠️ THIS FILE IS AUTOMATICALLY GENERATED!!! ⚠️

import {type CarrierId, type CarrierName, type DeliveryTypeName, type PackageTypeName} from '@myparcel/constants';

type DateTime = {
  date: string;
  timezone_type: number;
  timezone: string;
};

type DateTimeImmutable = DateTime;

export namespace Account {
  export type GetAccountsRequest = Base.Request;

  export type GetShopCarrierConfigurationRequest = Base.Request;

  export type GetShopCarrierConfigurationsRequest = Base.Request;

  export type GetShopCarrierOptionsRequest = Base.Request;

  export type GetShopRequest = Base.Request;

  export type GetShopsRequest = Base.Request;

  export type ModelAccount = {
    id: number;
    platformId: number;
    status: number;
    contactInfo: Base.ModelContactDetails;
    generalSettings: ModelAccountGeneralSettings;
    shops: ShopCollection;
  };

  export type ModelAccountGeneralSettings = {
    isTest: boolean;
    orderMode: boolean;
    hasCarrierContract: boolean;
  };

  export type ModelShop = {
    id: number;
    accountId: number;
    platformId: number;
    name: string;
    hidden: boolean;
    billing: Record<string, unknown>;
    deliveryAddress: Record<string, unknown>;
    generalSettings: Record<string, unknown>;
    return: Record<string, unknown>;
    shipmentOptions: Record<string, unknown>;
    trackTrace: Record<string, unknown>;
    carrierConfigurations: ShopCarrierConfigurationCollection;
    carriers: Carrier.CarrierCollection;
  };

  export type ModelShopCarrierConfiguration = {
    carrier?: string;
    defaultCutoffTime: string;
    defaultDropOffPoint: string;
    defaultDropOffPointIdentifier: string;
    mondayCutoffTime: string;
  };

  export type ShopCarrierConfigurationCollection = ModelShopCarrierConfiguration[];

  export type ShopCollection = ModelShop[];
}

export namespace Base {
  export type Model = Record<string, unknown>;

  export type ModelAddress = {
    address1?: string;
    address2?: string;
    area?: string;
    boxNumber?: string;
    cc?: string;
    city?: string;
    postalCode?: string;
    region?: string;
    state?: string;
  };

  export interface ModelContactDetails extends ModelAddress {
    company?: string;
    email?: string;
    person?: string;
    phone?: string;
  }

  export interface ModelShippingAddress extends ModelContactDetails {
    eoriNumber?: string;
    vatNumber?: string;
  }

  export interface ModelCurrency {
    amount: number;
    currency: string;
  }

  export interface Request {
    body?: string;
    headers: Record<string, string>;
    method: string;
    parameters: Record<string, string>;
    path: string;
    property: string;
    responseProperty?: string;
  }
}

export namespace Carrier {
  export type CarrierCollection = ModelCarrier[];

  export type ModelCapability = {
    type: string;
    enum: unknown[];
    minimum: number;
    maximum: number;
    minLength: number;
    maxLength: number;
  };

  export type ModelCarrier = {
    externalIdentifier?: string;
    id: CarrierId;
    name: CarrierName;
    human: string;
    subscriptionId?: number;
    enabled: boolean;
    primary: boolean;
    isDefault: boolean;
    optional: boolean;
    label?: string;
    type: string;
    capabilities: ModelCarrierCapabilities;
    returnCapabilities: ModelCarrierCapabilities;
  };

  export type ModelCarrierCapabilities = {
    deliveryTypes: string[];
    features: Record<string, unknown>;
    packageTypes: string[];
    shipmentOptions: Shipment.ModelShipmentOptions;
  };

  export type ModelShipmentOptionsCapabilities = {
    ageCheck: ModelCapability;
    dropOffAtPostalPoint: ModelCapability;
    insurance: ModelCapability;
    labelDescription: ModelCapability;
    largeFormat: ModelCapability;
    onlyRecipient: ModelCapability;
    return: ModelCapability;
    sameDayDelivery: ModelCapability;
    saturdayDelivery: ModelCapability;
    signature: ModelCapability;
  };
}

export namespace Frontend {
  export type FormElementCollection = (FormPlainElement | FormInteractiveElement)[];

  export type FormInteractiveElement = FormPlainElement & {
    name: string;
    label: string;
  };

  export type FormPlainElement = {
    component: string;
    props: Record<string, unknown>;
  };
}

export namespace Form {
  export type InputOptionsCollection = ModelInputOptions[];

  export type ModelFormGroup = {
    name: string;
  };

  export type ModelInputBaseInput = {
    component: string;
    name: string;
    label: string;
    props: Record<string, unknown>;
  };

  export type ModelInputCheckboxInput = ModelInputBaseInput & {
    description: string;
    element: string;
    label: string;
    name: string;
    type: string;
  };

  export type ModelInputHiddenInput = ModelInputTextInput & {
    description: string;
    element: string;
    label: string;
    name: string;
    type: string;
  };

  export type ModelInputNumberInput = ModelInputTextInput & {
    description: string;
    element: string;
    label: string;
    name: string;
    type: string;
  };

  export type ModelInputOptions = {
    query: unknown[];
    id: number;
    name: string;
  };

  export type ModelInputRadioButtonInput = ModelInputBaseInput & {
    description: string;
    element: string;
    label: string;
    multiple: boolean;
    name: string;
    options: ModelInputOptions;
  };

  export type ModelInputSelectCountrySelectInput = ModelInputSelectInput & {
    type: string;
    label: string;
    name: string;
    description: string;
    options: unknown[];
  };

  export type ModelInputSelectDropOffDaySelectInput = ModelInputBaseInput & {
    type: string;
    name: string;
    label: string;
    description: string;
  };

  export type ModelInputSelectInput = ModelInputBaseInput & {
    description: string;
    element: string;
    label: string;
    name: string;
    options: SelectOptionsCollection;
    type: string;
  };

  export type ModelInputTextInput = ModelInputBaseInput & {
    description: string;
    element: string;
    label: string;
    name: string;
    type: string;
  };

  export type ModelInputToggleInput = ModelInputBaseInput & {
    description: string;
    element: string;
    isBool: boolean;
    label: string;
    name: string;
    type: string;
    values: unknown[];
  };

  export type ModelSelectOptions = {
    name: string;
    label: string;
    options: unknown[];
  };

  export type SelectOptionsCollection = ModelSelectOptions[];
}

export namespace Fulfilment {
  export type GetOrdersRequest = Base.Request;

  export type ModelOrder = {
    accountId?: number;
    createdAt?: string;
    externalIdentifier?: string;
    fulfilmentPartnerIdentifier?: string;
    invoiceAddress?: Base.ModelContactDetails;
    language?: string;
    orderDate?: string;
    orderLines?: OrderLineCollection;
    price?: number;
    priceAfterVat?: number;
    // todo fix this in the generator
    shipment?: unknown;
    shopId?: number;
    status?: string;
    type?: string;
    updatedAt?: string;
    uuid?: string;
    vat?: number;
  };

  export type ModelOrderLine = {
    uuid?: string;
    quantity: number;
    price: number;
    vat: number;
    priceAfterVat: number;
    product?: ModelProduct;
    instructions: string;
    shippable: boolean;
  };

  export type ModelProduct = {
    externalIdentifier: string;
    uuid?: string;
    sku?: string;
    ean?: string;
    name?: string;
    description?: string;
    width: number;
    length: number;
    height: number;
    weight: number;
  };

  export type OrderCollection = ModelOrder[];

  export type OrderLineCollection = ModelOrderLine[];

  export type PostOrdersRequest = Base.Request;
}

export namespace Plugin {
  export type AbstractEndpointRequest = Base.Request;

  export type Context = Record<string, unknown>;

  export type DeleteShipmentsEndpointRequest = AbstractEndpointRequest;

  export type EndpointRequestCollection = Record<string, AbstractEndpointRequest>;

  export type ExportOrdersEndpointRequest = AbstractEndpointRequest;

  export type ExportPrintOrdersEndpointRequest = AbstractEndpointRequest;

  export type GetOrdersEndpointRequest = AbstractEndpointRequest;

  export type ModelContextContextBag = {
    global: ModelContextGlobalContext;
    dynamic?: ModelContextDynamicContext;
    orderData?: OrderDataContextCollection;
    pluginSettingsView?: ModelContextPluginSettingsViewContext;
    productData?: ProductDataContextCollection;
    productSettingsView?: ModelContextProductSettingsViewContext;
  };

  export type ModelContextDeliveryOptionsConfig = {
    apiBaseUrl: string;
    currency: string;
    packageType: string;
    locale: string;
    platform: string;
    basePrice: number;
    showPriceSurcharge: boolean;
    pickupLocationsDefaultView: string;
    priceStandardDelivery: number;
    carrierSettings: unknown[];
  };

  export type ModelContextCheckoutContext = {
    strings: Record<string, string>;
    config?: Shipment.ModelDeliveryOptions;
    settings: Record<string, unknown>;
  };

  export type ModelContextGlobalContext = {
    appInfo: {
      name: string;
      path: string;
      title: string;
      url: string;
      version: string;
    };
    baseUrl: string;
    bootId: string;
    endpoints: EndpointRequestCollection;
    eventPing: string;
    eventPong: string;
    language: string;
    mode: string;
    platform: {
      backofficeUrl: string;
      defaultCarrier: string;
      defaultCarrierId: number;
      human: string;
      localCountry: string;
      name: string;
    };
    translations: Record<string, string>;
  };

  export type ModelContextDynamicContext = {
    account: Account.ModelAccount;
    carriers: Carrier.CarrierCollection;
    pluginSettings: Settings.ModelSettings;
    printOptionsView: SettingsView;
    shop: Account.ModelShop;
  };

  export type ModelContextOrderDataContext = ModelPdkOrder & {
    inheritedDeliveryOptions: Record<string, Shipment.ModelDeliveryOptions>;
  };

  export type ModelContextProductDataContext = ModelPdkProduct;

  export type Field = {
    $attributes?: Record<string, unknown>;
    $component: string;
    $builders?: Record<string, unknown>[];
    $slot?: string;
    $wrapper?: string | boolean;
    label?: string;
    name?: string;
    subtext?: string;
  };

  export type SettingsView = {
    id: string;
    title: string;
    titleSuffix?: string;
    description?: string;
    subtext?: string;
    elements: null | Field[];
    children: null | SettingsView[];
  };

  export type ModelContextPluginSettingsViewContext = {
    general: SettingsView;
    order: SettingsView;
    label: SettingsView;
    customs: SettingsView;
    checkout: SettingsView;
    carrier: SettingsView;
  };

  export type ModelContextProductSettingsViewContext = {
    product: ModelPdkProduct;
    view: SettingsView[];
    values: Settings.ModelProductSettings;
  };

  export type ModelPdkOrder = {
    customsDeclaration?: Shipment.ModelCustomsDeclaration;
    deliveryOptions?: Shipment.ModelDeliveryOptions;
    exported: boolean;
    externalIdentifier: string;
    lines?: PdkOrderLineCollection;
    orderPrice: number;
    orderPriceAfterVat: number;
    orderVat: number;
    billingAddress?: Base.ModelContactDetails;
    shippingAddress: Base.ModelContactDetails;
    senderAddress?: Base.ModelContactDetails;
    shipmentPrice: number;
    shipmentPriceAfterVat: number;
    shipmentVat: number;
    shipments: Shipment.ShipmentCollection;
    totalPrice: number;
    totalPriceAfterVat: number;
    totalVat: number;
  };

  export type ModelPdkOrderLine = {
    quantity: number;
    price: number;
    vat: number;
    priceAfterVat: number;
    product?: Fulfilment.ModelProduct;
  };

  export type ModelPdkProduct = {
    externalIdentifier: string;
    sku?: string;
    name?: string;
    weight: number;
    settings: Settings.ModelProductSettings;
  };

  export type OrderDataContextCollection = ModelContextOrderDataContext[];

  export type ProductDataContextCollection = ModelContextProductDataContext[];

  export type PdkOrderCollection = ModelPdkOrder[];

  export type PdkOrderLineCollection = ModelPdkOrderLine[];

  export type PdkProductCollection = ModelPdkProduct[];

  export type PrintOrdersEndpointRequest = AbstractEndpointRequest;

  export type UpdateShipmentsEndpointRequest = AbstractEndpointRequest;

  export type UpdateOrdersEndpointRequest = AbstractEndpointRequest;
}

export namespace Settings {
  export type CarrierSettingsCollection = ModelCarrierSettings[];

  export type ModelAccountSettings = {
    apiKey: string;
  };

  export type ModelCarrierSettings = {
    carrierName: string;
    allowDeliveryOptions: boolean;
    allowEveningDelivery: boolean;
    allowInsuranceBelgium: boolean;
    allowMondayDelivery: boolean;
    allowMorningDelivery: boolean;
    allowOnlyRecipient: boolean;
    allowPickupLocations: boolean;
    allowSameDayDelivery: boolean;
    allowSaturdayDelivery: boolean;
    allowSignature: boolean;
    cutoffTime: string;
    cutoffTimeSameDay: string;
    defaultPackageType: string;
    deliveryOptionsCustomCss: string;
    deliveryOptionsDisplay: string;
    deliveryOptionsEnabledForBackorders: boolean;
    deliveryOptionsPosition: string;
    digitalStampDefaultWeight: number;
    dropOffPossibilities: ModelDropOffPossibilities;
    dropOffDelay: number;
    dropOffPoint: string;
    exportAgeCheck: boolean;
    exportInsurance: boolean;
    exportInsuranceAmount: number;
    exportInsuranceUpTo: number;
    exportLargeFormat: boolean;
    exportOnlyRecipient: boolean;
    exportReturnLargeFormat: boolean;
    exportReturnPackageType: string;
    exportReturnShipments: boolean;
    exportSignature: boolean;
    featureShowDeliveryDate: boolean;
    pickupLocationsDefaultView: string;
    priceEveningDelivery: number;
    priceMondayDelivery: number;
    priceMorningDelivery: number;
    priceOnlyRecipient: number;
    pricePackageTypeDigitalStamp: number;
    pricePackageTypeMailbox: number;
    pricePickup: number;
    priceSameDayDelivery: number;
    priceSignature: number;
    priceStandardDelivery: number;
    showDeliveryDay: boolean;
    showPriceAsSurcharge: boolean;
    useSeparateAddressFields: boolean;
    stringAddressNotFound: string;
    stringCity: string;
    stringCountry: string;
    stringDelivery: string;
    stringDiscount: string;
    stringEveningDelivery: string;
    stringFrom: string;
    stringHouseNumber: string;
    stringLoadMore: string;
    stringMorningDelivery: string;
    stringOnlyRecipient: string;
    stringOpeningHours: string;
    stringPickup: string;
    stringPickupLocationsListButton: string;
    stringPickupLocationsMapButton: string;
    stringPostalCode: string;
    stringRecipient: string;
    stringRetry: string;
    stringSaturdayDelivery: string;
    stringSignature: string;
    stringStandardDelivery: string;
    stringWrongNumberPostalCode: string;
    stringWrongPostalCodeCity: string;
  };

  export type ModelCheckoutSettings = {
    deliveryOptionsCustomCss: string;
    deliveryOptionsDisplay: boolean;
    deliveryOptionsPosition: string;
    pickupLocationsDefaultView: string;
    priceType: string;
    showDeliveryDay: boolean;
    showPriceAsSurcharge: boolean;
    useSeparateAddressFields: boolean;
    stringAddressNotFound: string;
    stringCountry: string;
    stringCity: string;
    stringDelivery: string;
    stringDiscount: string;
    stringEveningDelivery: string;
    stringFrom: string;
    stringHouseNumber: string;
    stringLoadMore: string;
    stringMorningDelivery: string;
    stringOnlyRecipient: string;
    stringOpeningHours: string;
    stringPickupLocationsListButton: string;
    stringPickupLocationsMapButton: string;
    stringPickup: string;
    stringPostalCode: string;
    stringRecipient: string;
    stringRetry: string;
    stringSaturdayDelivery: string;
    stringSignature: string;
    stringStandardDelivery: string;
    stringWrongNumberPostalCode: string;
    stringWrongPostalCodeCity: string;
  };

  export type ModelCustomsSettings = {
    countryOfOrigin?: string;
    customsCode: string;
    packageContents: string;
  };

  export type ModelDropOffPossibilities = {
    dropOffDays: Shipment.DropOffDayCollection;
    dropOffDaysDeviations: Shipment.DropOffDayCollection;
  };

  export type ModelGeneralSettings = {
    apiLogging: boolean;
    barcodeInNote: boolean;
    conceptShipments: boolean;
    exportWithAutomaticStatus?: string;
    orderMode: boolean;
    processDirectly: boolean;
    shareCustomerInformation: boolean;
    trackTraceInAccount: boolean;
    trackTraceInEmail: boolean;
  };

  export type ModelLabelSettings = {
    description?: string;
    format: string;
    output: string;
    position: number;
    prompt: boolean;
  };

  export type ModelOrderSettings = {
    emptyDigitalStampWeight?: number;
    emptyParcelWeight?: number;
    ignoreOrderStatuses?: string;
    orderStatusMail: boolean;
    saveCustomerAddress: boolean;
    sendNotificationAfter?: string;
    sendOrderStateForDigitalStamps: boolean;
    statusOnLabelCreate?: string;
    statusWhenDelivered?: string;
    statusWhenLabelScanned?: string;
  };

  export type ModelProductSettings = {
    allowOnlyRecipient: 0 | 1 | -1;
    allowSignature: 0 | 1 | -1;
    countryOfOrigin: string;
    customsCode: string;
    disableDeliveryOptions: 0 | 1 | -1;
    dropOffDelay: number;
    exportAgeCheck: 0 | 1 | -1;
    exportInsurance: 0 | 1 | -1;
    exportLargeFormat: 0 | 1 | -1;
    fitInMailbox: number;
    packageType: string;
    returnShipments: 0 | 1 | -1;
  };

  export type ModelSettings = {
    account: ModelAccountSettings;
    general: ModelGeneralSettings;
    order: ModelOrderSettings;
    label: ModelLabelSettings;
    customs: ModelCustomsSettings;
    checkout: ModelCheckoutSettings;
    carrier: Record<string, ModelCarrierSettings>;
  };
}

export namespace Shipment {
  import ModelCarrier = Carrier.ModelCarrier;

  export type CustomsDeclarationItemCollection = ModelCustomsDeclarationItem[];

  export type DeliveryTypeCollection = ModelDeliveryType[];

  export type DropOffDayCollection = ModelDropOffDay[];

  export type GetLabelsAsPdfRequest = GetLabelsRequest;

  export type GetLabelsRequest = Base.Request;

  export type GetShipmentsRequest = Base.Request;

  export type ModelCustomsDeclaration = {
    contents: number;
    items: CustomsDeclarationItemCollection;
    invoice?: string;
    weight: number;
  };

  export type ModelCustomsDeclarationItem = {
    amount: number;
    classification?: string;
    country?: string;
    description?: string;
    itemValue: Base.ModelCurrency;
    weight: number;
  };

  export type ModelDeliveryOptions = {
    carrier?: ModelCarrier;
    date?: DateTime;
    deliveryType?: DeliveryTypeName;
    labelAmount: number;
    packageType?: PackageTypeName;
    pickupLocation?: ModelRetailLocation;
    shipmentOptions: ModelShipmentOptions;
  };

  export type ModelDeliveryType = {
    id?: number;
    name?: string;
  };

  export type ModelDropOffDay = {
    cutoffTime?: string;
    date?: DateTimeImmutable;
    dispatch?: boolean;
    sameDayCutoffTime?: string;
    weekday: number;
  };

  export type ModelPackageType = {
    id?: number;
    name?: string;
  };

  export type ModelPhysicalProperties = {
    height?: number;
    length?: number;
    weight: number;
    width?: number;
  };

  export type ModelRetailLocation = Base.ModelAddress & {
    locationCode?: string;
    locationName?: string;
    retailNetworkId?: string;
    boxNumber?: string;
    cc?: string;
    city?: string;
    number?: string;
    numberSuffix?: string;
    postalCode?: string;
    region?: string;
    state?: string;
    street?: string;
  };

  export type ModelShipment = {
    id: number;
    shopId?: number;
    orderId: string;
    referenceIdentifier?: string;
    externalIdentifier?: string;
    apiKey?: string;
    barcode?: string;
    carrier?: Carrier.ModelCarrier;
    collectionContact?: string;
    customsDeclaration?: ModelCustomsDeclaration;
    delayed: boolean;
    delivered: boolean;
    deliveryOptions: ModelDeliveryOptions;
    dropOffPoint?: ModelRetailLocation;
    hidden: boolean;
    isReturn: boolean;
    linkConsumerPortal?: string;
    multiCollo: boolean;
    multiColloMainShipmentId?: string;
    partnerTrackTraces: unknown[];
    physicalProperties?: ModelPhysicalProperties;
    price: Base.ModelCurrency;
    shippingAddress: Base.ModelContactDetails;
    senderAddress?: Base.ModelContactDetails;
    shipmentType?: number;
    status?: number;
    deleted?: DateTime;
    updated: null | DateTime;
    created?: DateTime;
    createdBy?: number;
    modified?: DateTime;
    modifiedBy?: number;
  };

  export type ModelShipmentOptions = {
    ageCheck?: boolean;
    hideSender?: boolean;
    insurance?: number[];
    labelDescription?: string;
    largeFormat?: boolean;
    onlyRecipient?: boolean;
    return?: boolean;
    sameDayDelivery?: boolean;
    signature?: boolean;
  };

  export type PostReturnShipmentsRequest = Base.Request;

  export type PostShipmentsRequest = Base.Request;

  export type ShipmentCollection = ModelShipment[];

  export type UpdateShipmentsRequest = Base.Request;
}

export namespace Webhook {
  export type DeleteWebhookSubscriptionRequest = Base.Request;

  export type GetWebhookSubscriptionRequest = Base.Request;

  export type GetWebhookSubscriptionsRequest = Base.Request;

  export type ModelWebhookSubscription = {
    hook: string;
    url: string;
  };

  export type PostWebhookSubscriptionRequest = Base.Request;

  export type WebhookSubscriptionCollection = ModelWebhookSubscription[];
}
