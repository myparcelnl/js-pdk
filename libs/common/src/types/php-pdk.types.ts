// noinspection JSUnusedGlobalSymbols
/* eslint-disable @typescript-eslint/no-empty-interface */

export namespace Pdk {
  export interface Account {}

  export interface AccountAccountRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AccountCarrierOptionsRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AccountShopCarrierConfigurationRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AccountShopRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AccountGetAccountsRequest extends BaseRequest {}

  export interface AccountGetCarrierOptionsRequest extends BaseRequest {
    shopId: unknown;
  }

  export interface AccountGetShopCarrierConfigurationRequest extends BaseRequest {
    body: unknown;
    carrier: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
    shopId: unknown;
  }

  export interface AccountGetShopCarrierConfigurationsRequest extends BaseRequest {
    shopId: unknown;
  }

  export interface AccountGetShopRequest extends BaseRequest {
    shopId: unknown;
  }

  export interface AccountGetShopsRequest extends BaseRequest {}

  export interface AccountResponseGetAccountsResponseWithBody extends ApiResponseAbstractApiResponseWithBody {
    account: unknown;
  }

  export interface AccountResponseGetCarrierOptionsResponseWithBody extends ApiResponseAbstractApiResponseWithBody {
    options: unknown;
  }

  export interface AccountResponseGetShopCarrierConfigurationsResponseWithBody
    extends ApiResponseAbstractApiResponseWithBody {
    configurations: unknown;
  }

  export interface AccountResponseGetShopsResponseWithBody extends ApiResponseAbstractApiResponseWithBody {
    shop: unknown;
  }

  export type ApiApiException = Exception;

  export type ApiPdkEndpointException = Exception;

  export interface ApiAbstractApiResponse {
    errors: unknown;
    response: unknown;
  }

  export interface ApiResponseAbstractApiResponseWithBody extends ApiAbstractApiResponse {
    body: unknown;
  }

  export interface ApiClientResponse {
    body: unknown;
    statusCode: unknown;
  }

  interface HttpFoundation {}

  export interface ApiJsonResponse extends HttpFoundation {
    charset: unknown;
    content: unknown;
    statusCode: unknown;
    statusText: unknown;
    version: unknown;
  }

  export interface ApiAbstractApiService {
    baseUrl: unknown;
    clientAdapter: unknown;
  }

  export interface ApiMyParcelApiService extends ApiAbstractApiService {
    apiKey: unknown;
    baseUrl: unknown;
    clientAdapter: unknown;
    userAgent: unknown;
  }

  export interface Base {
    cache: unknown;
  }

  export interface Exception {}

  export type BaseInvalidCastException = Exception;

  export type BaseInvalidFacadeException = Exception;

  export interface Base {
    pdk: unknown;
  }

  export interface BasePdkFactory {}

  export interface BaseHttpResponseCodes {}

  export interface BaseModelAddress extends BaseModel {
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
  }

  export interface BaseModelContactDetails extends BaseModelAddress {
    cc?: string;
    city?: string;
    company?: string;
    email?: string;
    fullStreet?: string;
    number?: string;
    numberSuffix?: string;
    person?: string;
    phone?: string;
    postalCode?: string;
    region?: string;
    state?: string;
    street?: string;
    streetAdditionalInfo?: string;
  }

  export interface BaseModelCurrency extends BaseModel {
    amount: number;
    currency: string;
  }

  export interface BaseModel {}

  export interface Base {
    container: unknown;
  }

  export interface BasePdkActions {}

  export interface BasePdkEndpoint {
    manager: unknown;
  }

  export interface BaseApiRepository extends BaseRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface BaseRepository {
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface BaseRequest {}

  export interface BaseCountryService {}

  export interface BaseWeightService {}

  export interface BaseSupportCollection {
    cast: unknown;
    items: unknown;
    proxies: unknown;
  }

  export type BaseSupportHelpers = unknown;

  export type BaseSupportUtils = unknown;

  export type CarrierCarrierCapabilitiesCollection = CarrierModelCarrierCapabilities[];

  export type CarrierCarrierOptionsCollection = CarrierModelCarrierOptions[];

  export interface CarrierModelCapability extends BaseModel {
    enum: unknown[];
    maxLength: number;
    maximum: number;
    minLength: number;
    minimum: number;
    type: string;
  }

  export interface CarrierModelCarrierCapabilities extends BaseModel {
    deliveryTypes: ShipmentDeliveryTypeCollection;
    packageType: ShipmentModelPackageType;
    shipmentOptions: ShipmentModelShipmentOptions;
  }

  export interface CarrierModelCarrierOptions extends BaseModel {
    human?: string;
    id?: number;
    isDefault?: boolean;
    label?: string;
    name?: string;
    optional?: boolean;
    options: CarrierCarrierCapabilitiesCollection;
    primary?: boolean;
    returnOptions: CarrierCarrierCapabilitiesCollection;
    subscriptionId?: number;
    type?: string;
  }

  export interface CarrierModelShipmentOptionsCapabilities extends BaseModel {
    ageCheck: CarrierModelCapability;
    dropOffAtPostalPoint: CarrierModelCapability;
    insurance: CarrierModelCapability;
    labelDescription: CarrierModelCapability;
    largeFormat: CarrierModelCapability;
    onlyRecipient: CarrierModelCapability;
    return: CarrierModelCapability;
    sameDayDelivery: CarrierModelCapability;
    saturdayDelivery: CarrierModelCapability;
    signature: CarrierModelCapability;
  }

  export type FormInputOptionsCollection = FormModelInputOptions[];

  export type FormSelectOptionsCollection = FormModelSelectOptions[];

  export interface FormModelFormGroup extends BaseModel {
    name: string;
  }

  export interface FormModelInputOptions extends BaseModel {
    id: number;
    name: string;
    query: unknown[];
  }

  export interface FormModelInputAbstractInput extends BaseModel {}

  export interface FormModelInputCheckboxInput extends FormModelInputAbstractInput {
    description: string;
    label: string;
    multiple: boolean;
    name: string;
    type: string;
  }

  export interface FormModelInputHiddenInput extends FormModelInputAbstractInput {}

  export interface FormModelInputRadioButtonInput extends FormModelInputAbstractInput {
    description: string;
    label: string;
    multiple: boolean;
    name: string;
    options: FormModelInputOptions;
    type: string;
  }

  export interface FormModelInputSelectInput extends FormModelInputAbstractInput {
    options: FormSelectOptionsCollection;
  }

  export interface FormModelInputSelectCountrySelectInput {
    options: unknown[];
  }

  export interface FormModelInputSelectDropOffDaySelectInput extends FormModelInputAbstractInput {}

  export interface FormModelInputTextInput extends FormModelInputAbstractInput {}

  export interface FormModelInputToggleInput extends FormModelInputAbstractInput {
    description: string;
    isBool: boolean;
    label: string;
    name: string;
    type: string;
    values: unknown[];
  }

  export interface FormModelSelectOptions extends BaseModel {
    label: string;
    name: string;
    options: unknown[];
  }

  export type FulfilmentOrderCollection = FulfilmentModelOrder[];

  export type FulfilmentOrderLineCollection = FulfilmentModelOrderLine[];

  export interface FulfilmentModelOrder extends BaseModel {
    accountId?: number;
    createdAt?: string;
    externalIdentifier?: string;
    fulfilmentPartnerIdentifier?: string;
    invoiceAddress?: BaseModelContactDetails;
    language?: string;
    orderDate?: string;
    orderLines?: FulfilmentOrderLineCollection;
    price?: number;
    priceAfterVat?: number;
    shipment?: ShipmentModelShipment;
    shopId?: number;
    status?: string;
    type?: string;
    updatedAt?: string;
    uuid?: string;
    vat?: number;
  }

  export interface FulfilmentModelOrderLine extends BaseModel {
    price: number;
    priceAfterVat: number;
    product?: FulfilmentModelProduct;
    quantity: number;
    uuid?: string;
    vat: number;
  }

  export interface FulfilmentModelProduct extends BaseModel {
    description?: string;
    ean?: string;
    externalIdentifier?: string;
    height: number;
    length: number;
    name?: string;
    sku?: string;
    uuid?: string;
    weight: number;
    width: number;
  }

  export interface FulfilmentOrderRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface FulfilmentGetOrdersRequest extends BaseRequest {}

  export interface FulfilmentPostOrdersRequest extends BaseRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface FulfilmentGetOrdersResponse extends ApiResponseAbstractApiResponseWithBody {
    orders: unknown;
  }

  export interface FulfilmentPostOrdersResponse extends ApiResponseAbstractApiResponseWithBody {
    ids: unknown;
  }

  export interface LanguageLanguageRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface LanguageAbstractLanguageService {
    repository: unknown;
  }

  export interface LoggerAbstractLogger {}

  export interface PlatformPlatformManager {
    platform: unknown;
  }

  export interface PluginOrderAbstractOrderAction {
    orderRepository: unknown;
  }

  export interface PluginOrderExportOrderAction extends PluginOrderAbstractOrderAction {
    orderRepository: unknown;
    shipmentRepository: unknown;
  }

  export interface PluginOrderExportPrintOrderAction extends PluginOrderExportOrderAction {
    orderRepository: unknown;
  }

  export interface PluginOrderGetOrderDataAction extends PluginOrderAbstractOrderAction {
    orderRepository: unknown;
  }

  export interface PluginActionPdkActionManager {}

  export interface PluginActionPdkEndpointActions {
    headers: unknown;
    parameters: unknown;
  }

  export type PluginOrderDataContextCollection = PluginModelContextOrderDataContext[];

  export type PluginPdkOrderCollection = PluginModelPdkOrder[];

  export type PluginPdkOrderLineCollection = PluginModelPdkOrderLine[];

  export type PluginPdkProductCollection = PluginModelPdkProduct[];

  export interface Plugin {}

  export interface PluginModelContextContextBag extends BaseModel {
    deliveryOptions?: PluginModelContextDeliveryOptionsContext;
    global: PluginModelContextGlobalContext;
    orderData?: PluginOrderDataContextCollection;
  }

  export interface PluginModelContextDeliveryOptions extends BaseModel {
    apiBaseUrl: string;
    basePrice: number;
    carrierSettings: unknown[];
    currency: string;
    locale: string;
    packageType: string;
    pickupLocationsDefaultView: string;
    platform: string;
    priceStandardDelivery: number;
    showPriceSurcharge: boolean;
  }

  export interface PluginModelContextDeliveryOptionsContext extends BaseModel {
    config?: PluginModelContextDeliveryOptions;
    strings: Record<string, string>;
  }

  export type PluginModelContextEndpointRequestCollection = Record<string, PluginAbstractEndpointRequest>[];

  export interface PluginModelContextGlobalContext extends BaseModel {
    baseUrl: string;
    bootstrapId: string;
    endpoints: PluginModelContextEndpointRequestCollection;
    event: string;
    mode: string;
    pluginSettings: {
      carrier: SettingsModelCarrierSettings[];
      checkout: SettingsModelCheckoutSettings;
      general: SettingsModelGeneralSettings;
      label: SettingsModelLabelSettings;
      order: SettingsModelOrderSettings;
    };
    translations: Record<string, string>;
  }

  export interface PluginModelContextOrderDataContext extends PluginModelPdkOrder {
    customsDeclaration?: ShipmentModelCustomsDeclaration;
    deliveryOptions?: ShipmentModelDeliveryOptions;
    externalIdentifier?: string;
    label?: ShipmentModelLabel;
    recipient?: BaseModelContactDetails;
    sender?: BaseModelContactDetails;
    shipments?: ShipmentShipmentCollection;
  }

  export interface PluginModelPdkOrder extends BaseModel {
    customsDeclaration?: ShipmentModelCustomsDeclaration;
    deliveryOptions?: ShipmentModelDeliveryOptions;
    externalIdentifier?: string;
    label?: ShipmentModelLabel;
    lines?: PluginPdkOrderLineCollection;
    recipient?: BaseModelContactDetails;
    sender?: BaseModelContactDetails;
    shipmentPrice?: number;
    shipmentPriceAfterVat?: number;
    shipmentVat?: number;
    shipments?: ShipmentShipmentCollection;
  }

  export interface PluginModelPdkOrderLine extends BaseModel {
    price: number;
    priceAfterVat: number;
    product?: FulfilmentModelProduct;
    quantity: number;
    vat: number;
  }

  export interface PluginModelPdkProduct extends BaseModel {
    settings: SettingsModelProductSettings;
    sku?: string;
    weight: number;
  }

  export interface PluginAbstractPdkOrderRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface PluginAbstractEndpointRequest extends BaseRequest {
    body: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface PluginExportOrderEndpointRequest extends PluginAbstractEndpointRequest {}

  export interface PluginExportPrintOrderEndpointRequest extends PluginAbstractEndpointRequest {}

  export interface PluginGetOrderDataEndpointRequest extends PluginAbstractEndpointRequest {}

  export interface PluginContextService {}

  export interface PluginRenderService {
    contextService: unknown;
    jsInitTemplate: unknown;
    renderTemplate: unknown;
  }

  export interface ProductAbstractProductRepository extends BaseRepository {}

  export type SettingsCarrierSettingsCollection = SettingsModelCarrierSettings[];

  export interface SettingsModelCarrierSettings extends BaseModel {
    allowDeliveryOptions: boolean;
    allowEveningDelivery: boolean;
    allowMondayDelivery: boolean;
    allowMorningDelivery: boolean;
    allowOnlyRecipient: boolean;
    allowPickupLocations: boolean;
    allowSameDayDelivery: boolean;
    allowSaturdayDelivery: boolean;
    allowSignature: boolean;
    defaultPackageType: string;
    digitalStampDefaultWeight: string;
    dropOffPossibilities: SettingsModelDropOffPossibilities;
    exportAgeCheck: boolean;
    exportExtraLargeFormat: boolean;
    exportInsured: boolean;
    exportInsuredAmount: number;
    exportInsuredAmountMax: number;
    exportInsuredForBe: boolean;
    exportOnlyRecipient: boolean;
    exportReturnShipments: boolean;
    exportSignature: boolean;
    featureShowDeliveryDate: boolean;
    priceEveningDelivery: number;
    priceMorningDelivery: number;
    priceOnlyRecipient: number;
    pricePackageTypeDigitalStamp: number;
    pricePackageTypeMailbox: number;
    pricePickup: number;
    priceSameDayDelivery: number;
    priceSignature: number;
    priceStandardDelivery: number;
  }

  export interface SettingsModelCheckoutSettings extends BaseModel {
    pickupLocationsDefaultView: string;
    showPriceSurcharge: boolean;
  }

  export interface SettingsModelCustomsSettings extends BaseModel {
    defaultCountryOfOrigin?: string;
    defaultCustomsCode: string;
    defaultPackageContents: string;
  }

  export interface SettingsModelDeliveryOptionsStringsSettings extends BaseModel {
    addressNotFoundTitle?: string;
    cc?: string;
    city?: string;
    deliveryTitle?: string;
    discount?: string;
    eveningDeliveryTitle?: string;
    from?: string;
    houseNumber?: string;
    loadMore?: string;
    morningDeliveryTitle?: string;
    onlyRecipientTitle?: string;
    openingHours?: string;
    pickupLocationsListButton?: string;
    pickupLocationsMapButton?: string;
    pickupTitle?: string;
    postcode?: string;
    recipientTitle?: string;
    retry?: string;
    saturdayDeliveryTitle?: string;
    signatureTitle?: string;
    standardDeliveryTitle?: string;
    wrongNumberPostalCode?: string;
    wrongPostalCodeCity?: string;
  }

  export interface SettingsModelDropOffPossibilities extends BaseModel {
    deliveryDaysWindow: number;
    dropOffDays: unknown[];
    dropOffDaysDeviations: unknown[];
    dropOffDelay: number;
  }

  export interface SettingsModelGeneralSettings extends BaseModel {
    apiKey?: string;
    barcodeInNote: boolean;
    conceptShipments: boolean;
    enableApiLogging: boolean;
    orderMode: boolean;
    priceType?: string;
    processDirectly: boolean;
    shareCustomerInformation: boolean;
    showDeliveryDay: boolean;
    trackTraceEmail: boolean;
    trackTraceMyAccount: boolean;
    useSeparateAddressFields: boolean;
  }

  export interface SettingsModelLabelSettings extends BaseModel {
    defaultPosition?: string;
    labelDescription?: string;
    labelOpenDownload?: string;
    labelSize?: string;
    promptPosition: boolean;
  }

  export interface SettingsModelOrderSettings extends BaseModel {
    ignoreOrderStatuses: string;
    orderStatusMail: string;
    sendNotificationAfter: string;
    sendOrderStateForDigitalStamps: number;
    statusOnLabelCreate: string;
    statusWhenDelivered: string;
    statusWhenLabelScanned: string;
  }

  export interface SettingsModelProductSettings extends BaseModel {
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
  }

  export interface SettingsModelSettings extends BaseModel {
    carrier: unknown[];
    customs: SettingsModelCustomsSettings;
    general: SettingsModelGeneralSettings;
    label: SettingsModelLabelSettings;
    order: SettingsModelOrderSettings;
  }

  export interface SettingsAbstractSettingsRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface SettingsSettingsManager {
    repository: unknown;
    settings: unknown;
  }

  export interface SettingsAbstractView {
    fields: unknown;
  }

  export type SettingsCarrierSettingsView = SettingsAbstractView;

  export type SettingsCustomsSettingsView = SettingsAbstractView;

  export type SettingsDeliveryOptionsStringsSettingsView = SettingsAbstractView;

  export type SettingsGeneralSettingsView = SettingsAbstractView;

  export type SettingsLabelSettingsView = SettingsAbstractView;

  export type SettingsOrderSettingsView = SettingsAbstractView;

  export type SettingsProductSettingsView = SettingsAbstractView;

  export type ShipmentCustomsDeclarationItemCollection = unknown[];

  export type ShipmentDeliveryTypeCollection = ShipmentModelDeliveryType[];

  export type ShipmentDropOffDayCollection = ShipmentModelDropOffDay[];

  export type ShipmentShipmentCollection = ShipmentModelShipment[];

  export interface ShipmentModelCustomsDeclaration extends BaseModel {
    contents: number;
    invoice?: string;
    items: ShipmentCustomsDeclarationItemCollection;
    weight: number;
  }

  export interface ShipmentModelCustomsDeclarationItem extends BaseModel {
    amount: number;
    classification?: string;
    country?: string;
    description?: string;
    itemValue: BaseModelCurrency;
    weight: number;
  }

  export interface ShipmentModelDeliveryOptions extends BaseModel {
    carrier?: string;
    date?: Record<string, unknown>;
    deliveryType?: string;
    labelAmount: number;
    packageType?: string;
    pickupLocation?: ShipmentModelRetailLocation;
    shipmentOptions: ShipmentModelShipmentOptions;
  }

  export interface ShipmentModelDeliveryType extends BaseModel {
    id?: number;
    name?: string;
  }

  export interface ShipmentModelDropOffDay extends BaseModel {
    cutoffTime?: string;
    date: Record<string, unknown>;
    dispatch?: boolean;
    sameDayCutoffTime?: string;
    weekday: number;
  }

  export interface ShipmentModelLabel extends BaseModel {
    link: string;
    pdf: string;
  }

  export interface ShipmentModelPackageType extends BaseModel {
    id?: number;
    name?: string;
  }

  export interface ShipmentModelPhysicalProperties extends BaseModel {
    height?: number;
    length?: number;
    weight?: number;
    width?: number;
  }

  export interface ShipmentModelRetailLocation extends BaseModelAddress {
    boxNumber?: string;
    cc?: string;
    city?: string;
    locationCode?: string;
    locationName?: string;
    number?: string;
    numberSuffix?: string;
    postalCode?: string;
    region?: string;
    retailNetworkId?: string;
    state?: string;
    street?: string;
  }

  export interface ShipmentModelShipment extends BaseModel {
    apiKey?: string;
    barcode?: string;
    carrier?: CarrierModelCarrierOptions;
    collectionContact?: string;
    created?: Record<string, unknown>;
    createdBy?: string;
    customsDeclaration?: ShipmentModelCustomsDeclaration;
    delayed?: boolean;
    delivered?: boolean;
    deliveryOptions: ShipmentModelDeliveryOptions;
    dropOffPoint?: ShipmentModelRetailLocation;
    externalIdentifier?: string;
    id?: number;
    isReturn?: boolean;
    linkConsumerPortal?: string;
    modified?: Record<string, unknown>;
    modifiedBy?: string;
    multiCollo: boolean;
    multiColloMainShipmentId?: string;
    orderId?: string;
    partnerTrackTraces?: unknown[];
    physicalProperties?: ShipmentModelPhysicalProperties;
    recipient: BaseModelContactDetails;
    referenceIdentifier?: string;
    sender?: BaseModelContactDetails;
    shopId?: number;
    status?: number;
    updated?: boolean;
  }

  export interface ShipmentModelShipmentOptions extends BaseModel {
    ageCheck?: boolean;
    insurance?: number;
    labelDescription?: string;
    largeFormat?: boolean;
    onlyRecipient?: boolean;
    return?: boolean;
    sameDayDelivery?: boolean;
    signature?: boolean;
  }

  export interface ShipmentShipmentRepository extends BaseApiRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface ShipmentGetLabelsAsPdfRequest extends ShipmentGetLabelsRequest {}

  export interface ShipmentGetLabelsRequest extends BaseRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ShipmentGetShipmentsRequest extends BaseRequest {}

  export interface ShipmentPostReturnShipmentsRequest extends BaseRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ShipmentPostShipmentsRequest extends BaseRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ShipmentUpdateShipmentsRequest extends BaseRequest {
    body: unknown;
    headers: unknown;
    ids: unknown;
    method: unknown;
    parameters: unknown;
    path: unknown;
    referenceIdentifiers: unknown;
    size: unknown;
  }

  export interface ShipmentGetLabelsPdfResponse extends ApiResponseAbstractApiResponseWithBody {
    pdf: unknown;
  }

  export interface ShipmentGetLabelsResponse extends ApiResponseAbstractApiResponseWithBody {
    labelLink: unknown;
  }

  export interface ShipmentGetShipmentsResponse extends ApiResponseAbstractApiResponseWithBody {
    shipments: unknown;
  }

  export interface ShipmentPostShipmentsResponse extends ApiResponseAbstractApiResponseWithBody {
    ids: unknown;
  }

  export interface ShipmentDeliveryDateService {}

  export interface ShipmentServiceDeliveryOptionsMerger {}

  export interface StorageAbstractStorage {}

  export interface StorageMemoryCacheStorage extends StorageAbstractStorage {
    data: unknown;
  }

  export interface ValidationOrderValidator {
    additionalSchema: unknown;
    baseSchema: unknown;
    errors: unknown;
    order: unknown;
    orderArray: unknown;
  }
}
