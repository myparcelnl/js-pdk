/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/no-namespace,@typescript-eslint/naming-convention */
// noinspection JSUnusedGlobalSymbols

export namespace Account {
  export type GetAccountsRequest = Base.Request;

  export type GetCarrierOptionsRequest = Base.Request;

  export type GetShopCarrierConfigurationRequest = Base.Request;

  export type GetShopCarrierConfigurationsRequest = Base.Request;

  export type GetShopRequest = Base.Request;

  export type GetShopsRequest = Base.Request;
}

export namespace Base {
  export type Model = Record<string, unknown>;

  export type ModelAddress = {
    boxNumber?: string;
    cc?: string;
    city?: string;
    fullStreet?: string;
    number?: string;
    numberSuffix?: string;
    postalCode?: string;
    region?: string;
    state?: string;
    street?: string;
    streetAdditionalInfo?: string;
  };

  export type ModelContactDetails = ModelAddress & {
    company?: string;
    email?: string;
    person?: string;
    phone?: string;
    cc?: string;
    city?: string;
    fullStreet?: string;
    number?: string;
    numberSuffix?: string;
    postalCode?: string;
    region?: string;
    state?: string;
    street?: string;
    streetAdditionalInfo?: string;
  };

  export type ModelCurrency = {
    amount: number;
    currency: string;
  };

  export type Request = {
    body?: string;
    headers: Record<string, string>;
    method: string;
    parameters: Record<string, string>;
    path: string;
    property: string;
  };
}

export namespace Carrier {
  export type CarrierCapabilitiesCollection = ModelCarrierCapabilities[];

  export type CarrierOptionsCollection = ModelCarrierOptions[];

  export type ModelCapability = {
    type: string;
    enum: unknown[];
    minimum: number;
    maximum: number;
    minLength: number;
    maxLength: number;
  };

  export type ModelCarrierCapabilities = {
    deliveryTypes: Shipment.DeliveryTypeCollection;
    packageType: Shipment.ModelPackageType;
    shipmentOptions: Shipment.ModelShipmentOptions;
  };

  export type ModelCarrierOptions = {
    id?: number;
    name?: string;
    human?: string;
    subscriptionId?: number;
    primary?: boolean;
    isDefault?: boolean;
    optional?: boolean;
    label?: string;
    type?: string;
    options: CarrierCapabilitiesCollection;
    returnOptions: CarrierCapabilitiesCollection;
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

export namespace Form {
  export type InputOptionsCollection = ModelInputOptions[];

  export type ModelFormGroup = {
    name: string;
  };

  export type ModelInputBaseInput = {
    element: string;
    type: string;
    name: string;
    label: string;
    description: string;
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
    deliveryOptions?: Shipment.ModelDeliveryOptions;
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
    uuid?: string;
    sku?: string;
    ean?: string;
    externalIdentifier?: string;
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

  export type EndpointRequestCollection = Record<string, AbstractEndpointRequest>[];

  export type ExportOrdersEndpointRequest = AbstractEndpointRequest;

  export type ExportPrintOrdersEndpointRequest = AbstractEndpointRequest;

  export type GetOrdersEndpointRequest = AbstractEndpointRequest;

  export type ModelContextContextBag = {
    global: ModelContextGlobalContext;
    orderData?: OrderDataContextCollection;
    deliveryOptions?: ModelContextDeliveryOptionsContext;
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

  export type ModelContextDeliveryOptionsContext = {
    strings: Record<string, string>;
    config?: Shipment.ModelDeliveryOptions;
  };

  export type ModelContextGlobalContext = {
    baseUrl: string;
    bootstrapId: string;
    endpoints: EndpointRequestCollection;
    event: string;
    mode: string;
    pluginSettings: Settings.ModelSettings;
    translations: Record<string, string>;
  };

  export type ModelContextOrderDataContext = ModelPdkOrder & {
    externalIdentifier?: string;
    customsDeclaration?: Shipment.ModelCustomsDeclaration;
    deliveryOptions?: Shipment.ModelDeliveryOptions;
    recipient?: Base.ModelContactDetails;
    sender?: Base.ModelContactDetails;
    shipments?: Shipment.ShipmentCollection;
    label?: Shipment.ModelLabel;
  };

  export type ModelPdkOrder = {
    externalIdentifier?: string;
    customsDeclaration?: Shipment.ModelCustomsDeclaration;
    deliveryOptions?: Shipment.ModelDeliveryOptions;
    lines?: PdkOrderLineCollection;
    recipient?: Base.ModelContactDetails;
    sender?: Base.ModelContactDetails;
    shipmentPrice?: number;
    shipmentVat?: number;
    shipments?: Shipment.ShipmentCollection;
    label?: Shipment.ModelLabel;
    orderPrice: number;
    orderVat: number;
    orderPriceAfterVat: number;
    shipmentPriceAfterVat: number;
    totalPrice: number;
    totalVat: number;
    totalPriceAfterVat: number;
  };

  export type ModelPdkOrderLine = {
    quantity: number;
    price: number;
    vat: number;
    priceAfterVat: number;
    product?: Fulfilment.ModelProduct;
  };

  export type ModelPdkProduct = {
    sku?: string;
    name?: string;
    weight: number;
    settings: Settings.ModelProductSettings;
  };

  export type OrderDataContextCollection = ModelContextOrderDataContext[];

  export type PdkOrderCollection = ModelPdkOrder[];

  export type PdkOrderLineCollection = ModelPdkOrderLine[];

  export type PdkProductCollection = ModelPdkProduct[];

  export type PrintOrderEndpointRequest = AbstractEndpointRequest;
}

export namespace Settings {
  export type CarrierSettingsCollection = ModelCarrierSettings[];

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
    dropOffDelay: number;
    deliveryDaysWindow: number;
  };

  export type ModelGeneralSettings = {
    apiKey?: string;
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
    allowOnlyRecipient: boolean;
    allowSignature: boolean;
    countryOfOrigin: string;
    customsCode: string;
    disableDeliveryOptions: boolean;
    dropOffDelay: number;
    exportAgeCheck: boolean;
    exportInsurance: boolean;
    exportLargeFormat: boolean;
    fitInMailbox: number;
    packageType: string;
    returnShipments: boolean;
  };

  export type ModelSettings = {
    general: ModelGeneralSettings;
    order: ModelOrderSettings;
    label: ModelLabelSettings;
    customs: ModelCustomsSettings;
    checkout: ModelCheckoutSettings;
    carrier: CarrierSettingsCollection;
  };
}

export namespace Shipment {
  export type CustomsDeclarationItemCollection = ModelCustomsDeclarationItem;

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
    carrier?: string;
    date?: DateTime;
    deliveryType?: string;
    labelAmount: number;
    packageType?: string;
    pickupLocation?: ModelRetailLocation;
    shipmentOptions: ModelShipmentOptions;
  };

  export type ModelDeliveryType = {
    id?: number;
    name?: string;
  };

  export type ModelDropOffDay = {
    cutoffTime?: string;
    date: DateTimeImmutable;
    dispatch?: boolean;
    sameDayCutoffTime?: string;
    weekday: number;
  };

  export type ModelLabel = {
    link: string;
    pdf: string;
  };

  export type ModelPackageType = {
    id?: number;
    name?: string;
  };

  export type ModelPhysicalProperties = {
    height?: number;
    length?: number;
    weight?: number;
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
    id?: number;
    orderId?: string;
    shopId?: number;
    referenceIdentifier?: string;
    externalIdentifier?: string;
    apiKey?: string;
    barcode?: string;
    carrier?: Carrier.ModelCarrierOptions;
    collectionContact?: string;
    customsDeclaration?: ModelCustomsDeclaration;
    delayed?: boolean;
    delivered?: boolean;
    deliveryOptions: ModelDeliveryOptions;
    dropOffPoint?: ModelRetailLocation;
    isReturn?: boolean;
    linkConsumerPortal?: string;
    multiCollo: boolean;
    multiColloMainShipmentId?: string;
    partnerTrackTraces?: unknown[];
    physicalProperties?: ModelPhysicalProperties;
    recipient: Base.ModelContactDetails;
    sender?: Base.ModelContactDetails;
    status?: number;
    updated?: boolean;
    created?: DateTime;
    createdBy?: string;
    modified?: DateTime;
    modifiedBy?: string;
  };

  export type ModelShipmentOptions = {
    ageCheck?: boolean;
    insurance?: number;
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
