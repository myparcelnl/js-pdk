// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

export namespace MyParcelPdk {
  export interface Platform {

  }

  export interface AccountRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface CarrierOptionsRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface ShopCarrierConfigurationRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface ShopRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface GetAccountsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetCarrierOptionsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
    shopId: unknown;
  }

  export interface GetShopCarrierConfigurationRequest {
    body: unknown;
    carrier: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
    shopId: unknown;
  }

  export interface GetShopCarrierConfigurationsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
    shopId: unknown;
  }

  export interface GetShopRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
    shopId: unknown;
  }

  export interface GetShopsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetAccountsResponseWithBody {
    account: unknown;
  }

  export interface GetCarrierOptionsResponseWithBody {
    options: unknown;
  }

  export interface GetShopCarrierConfigurationsResponseWithBody {
    configurations: unknown;
  }

  export interface GetShopsResponseWithBody {
    shop: unknown;
  }

  export interface ClientAdapterInterface {

  }

  export interface ApiResponseInterface {

  }

  export interface ClientResponseInterface {

  }

  export interface ApiException {
    code: unknown;
    file: unknown;
    line: unknown;
    message: unknown;
  }

  export interface PdkEndpointException {
    code: unknown;
    file: unknown;
    line: unknown;
    message: unknown;
  }

  export interface AbstractApiResponse {
    errors: unknown;
    response: unknown;
  }

  export interface AbstractApiResponseWithBody {
    body: unknown;
  }

  export interface ClientResponse {
    body: unknown;
    statusCode: unknown;
  }

  export interface ErrorResponse {
    charset: unknown;
    content: unknown;
    statusCode: unknown;
    statusText: unknown;
    version: unknown;
  }

  export interface JsonResponse {
    charset: unknown;
    content: unknown;
    statusCode: unknown;
    statusText: unknown;
    version: unknown;
  }

  export interface AbstractApiService {
    baseUrl: unknown;
    clientAdapter: unknown;
  }

  export interface ApiServiceInterface {

  }

  export interface MyParcelApiService {
    apiKey: unknown;
    baseUrl: unknown;
    clientAdapter: unknown;
    userAgent: unknown;
  }

  export interface HasAttributes {
    attributes: unknown;
    casts: unknown;
    classCastCache: unknown;
    dateFormats: unknown;
    guarded: unknown;
    mutatorCache: unknown;
    primitiveCastTypes: unknown;
  }

  export interface HidesAttributes {
    hidden: unknown;
    visible: unknown;
  }

  export interface Config {
    cache: unknown;
  }

  export interface ConfigInterface {

  }

  export interface Container {
    instance: unknown;
  }

  export interface InvalidCastException {
    code: unknown;
    file: unknown;
    line: unknown;
    message: unknown;
  }

  export interface InvalidFacadeException {
    code: unknown;
    file: unknown;
    line: unknown;
    message: unknown;
  }

  export interface Facade {
    pdk: unknown;
  }

  export interface PdkFactory {
    index: unknown;
  }

  export interface Address {
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

  export interface ContactDetails {
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

  export interface Currency {
    amount: number;
    currency: string;
  }

  export interface Model {
    attributes: unknown;
    booted: unknown;
    casts: unknown;
    classCastCache: unknown;
    dateFormats: unknown;
    guarded: unknown;
    hidden: unknown;
    mutatorCache: unknown;
    primitiveCastTypes: unknown;
    traitInitializers: unknown;
    visible: unknown;
  }

  export interface Pdk {
    container: unknown;
  }

  export interface PdkActions {

  }

  export interface AbstractRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface Request {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface RequestInterface {

  }

  export interface CountryService {

  }

  export interface CountryServiceInterface {

  }

  export interface WeightService {

  }

  export interface Settings {
    pdk: unknown;
  }

  export interface Arrayable {

  }

  export interface Collection {
    cast: unknown;
    items: unknown;
    proxies: unknown;
  }

  export interface Constant {

  }

  export interface Helpers {

  }

  export interface Utils {

  }

  export type CarrierCapabilitiesCollection = CarrierCapabilities[];

  export type CarrierOptionsCollection = CarrierOptions[];

  export interface Capability {
    enum: unknown[];
    maxLength: number;
    maximum: number;
    minLength: number;
    minimum: number;
    type: string;
  }

  export interface CarrierCapabilities {
    deliveryTypes: DeliveryTypeCollection;
    packageType: PackageType;
    shipmentOptions: ShipmentOptions;
  }

  export interface CarrierOptions {
    human?: string;
    id?: number;
    isDefault?: boolean;
    label?: string;
    name?: string;
    optional?: boolean;
    options: CarrierCapabilitiesCollection;
    primary?: boolean;
    returnOptions: CarrierCapabilitiesCollection;
    subscriptionId?: number;
    type?: string;
  }

  export interface ShipmentOptionsCapabilities {
    ageCheck: Capability;
    dropOffAtPostalPoint: Capability;
    insurance: Capability;
    labelDescription: Capability;
    largeFormat: Capability;
    onlyRecipient: Capability;
    return: Capability;
    sameDayDelivery: Capability;
    saturdayDelivery: Capability;
    signature: Capability;
  }

  export interface Config {
    pdk: unknown;
  }

  export interface DefaultLogger {
    pdk: unknown;
  }

  export interface LanguageService {
    pdk: unknown;
  }

  export interface Pdk {
    pdk: unknown;
  }

  export interface RenderService {
    pdk: unknown;
  }

  export type InputOptionsCollection = InputOptions[];

  export type SelectOptionsCollection = SelectOptions[];

  export interface FormGroup {
    name: string;
  }

  export interface InputOptions {
    id: number;
    name: string;
    query: unknown[];
  }

  export interface AbstractInput {
    description: string;
    label: string;
    name: string;
    type: string;
  }

  export interface CheckboxInput {
    description: string;
    label: string;
    multiple: boolean;
    name: string;
    type: string;
  }

  export interface HiddenInput {
    description: string;
    label: string;
    name: string;
    type: string;
  }

  export interface RadioButtonInput {
    description: string;
    label: string;
    multiple: boolean;
    name: string;
    options: InputOptions;
    type: string;
  }

  export interface SelectInput {
    description: string;
    label: string;
    name: string;
    options: SelectOptionsCollection;
    type: string;
  }

  export interface CountrySelectInput {
    description: string;
    label: string;
    name: string;
    options: unknown[];
    type: string;
  }

  export interface DropOffDaySelectInput {
    description: string;
    label: string;
    name: string;
    type: string;
  }

  export interface TextInput {
    description: string;
    label: string;
    name: string;
    type: string;
  }

  export interface ToggleInput {
    description: string;
    isBool: boolean;
    label: string;
    name: string;
    type: string;
    values: unknown[];
  }

  export interface SelectOptions {
    label: string;
    name: string;
    options: unknown[];
  }

  export interface Order {
    accountId?: number;
    expectedDeliveryDate?: string;
    expectedDeliveryTimeframe?: string;
    externalIdentifier?: string;
    fulfilmentPartnerIdentifier?: string;
    invoiceAddress?: unknown[];
    language?: string;
    orderDate?: string;
    orderLines?: unknown[];
    price?: number;
    priceAfterVat?: number;
    shipment?: unknown[];
    shopId?: number;
    status?: string;
    type?: string;
    uuid?: string;
    vat?: number;
  }

  export interface LanguageRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AbstractLanguageService {
    repository: unknown;
  }

  export interface LanguageServiceInterface {

  }

  export interface AbstractLogger {

  }

  export interface AbstractAction {

  }

  export interface ActionInterface {

  }

  export interface GetDeliveryOptionsAction {

  }

  export interface GetLabelAction {

  }

  export interface AbstractOrderAction {
    orderRepository: unknown;
  }

  export interface ExportOrderAction {
    orderRepository: unknown;
  }

  export interface ExportPrintOrderAction {
    orderRepository: unknown;
  }

  export interface GenerateShipmentsAction {
    orderRepository: unknown;
  }

  export interface GetOrderDataAction {
    orderRepository: unknown;
  }

  export type OrderDataContextCollection = OrderDataContext[];

  export type PdkOrderCollection = PdkOrder[];

  export interface ContextServiceInterface {

  }

  export interface EndpointActionsInterface {

  }

  export interface RenderServiceInterface {

  }

  export interface Context {

  }

  export interface AbstractPdkController {

  }

  export interface PdkActionManager {
    errors: unknown;
  }

  export interface PdkControllerInterface {

  }

  export interface PdkOrderController {
    repository: unknown;
  }

  export interface PdkResponseInterface {

  }

  export interface ContextBag {
    global: GlobalContext;
    orderData?: OrderDataContextCollection;
    pluginSettings?: PluginSettingsContext;
  }

  export type EndpointRequestCollection = Record<string, AbstractEndpointRequest>[];

  export interface GlobalContext {
    baseUrl: string;
    bootstrapId: string;
    endpoints: EndpointRequestCollection;
    event: string;
    mode: string;
    translations: Record<string, string>;
  }

  export interface OrderDataContext {
    deliveryOptions: DeliveryOptions;
    externalIdentifier: string;
    recipient: ContactDetails;
    sender: ContactDetails;
    shipments: ShipmentCollection;
  }

  export interface PluginSettingsContext {

  }

  export interface PdkOrder {
    customsDeclaration?: CustomsDeclaration;
    deliveryOptions?: DeliveryOptions;
    externalIdentifier?: string;
    recipient?: ContactDetails;
    sender?: ContactDetails;
    shipments?: ShipmentCollection;
  }

  export interface PdkEndpointActions {
    headers: unknown;
    parameters: unknown;
  }

  export interface AbstractPdkOrderRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface AbstractEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ExportOrderEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ExportPrintOrderEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetActionsEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetAdminEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetDeliveryOptionsEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetLabelEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetOrderDataEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetSettingsEndpointRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface ContextService {

  }

  export interface RenderService {
    contextService: unknown;
    jsInitTemplate: unknown;
    renderTemplate: unknown;
  }

  export interface CarrierSettings {
    allowDeliveryOptions: boolean;
    allowEveningDelivery: boolean;
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
    digitalStampDefaultWeight: string;
    dropOffDays: unknown[];
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

  export interface CustomsSettings {
    defaultCountryOfOrigin?: string;
    defaultCustomsCode: string;
    defaultPackageContents: string;
  }

  export interface DeliveryOptionsStringsSettings {
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

  export interface DropOffDayPossibilities {
    deliveryDaysWindow?: number;
    dropOffDays: DropOffDayCollection;
    dropOffDaysDeviations: DropOffDayCollection;
    dropOffDelay?: number;
  }

  export interface GeneralSettings {
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

  export interface LabelSettings {
    defaultPosition?: string;
    labelDescription?: string;
    labelOpenDownload?: string;
    labelSize?: string;
    promptPosition: boolean;
  }

  export interface OrderSettings {
    ignoreOrderStatuses: string;
    orderStatusMail: string;
    sendNotificationAfter: string;
    sendOrderStateForDigitalStamps: number;
    statusOnLabelCreate: string;
    statusWhenDelivered: string;
    statusWhenLabelScanned: string;
  }

  export interface AbstractView {
    fields: unknown;
  }

  export interface CarrierSettingsView {

  }

  export interface CustomsSettingsView {

  }

  export interface DeliveryOptionsStringsSettingsView {

  }

  export interface GeneralSettingsView {

  }

  export interface LabelSettingsView {

  }

  export interface OrderSettingsView {

  }

  export type CustomsDeclarationItemCollection = CustomsDeclarationItem[];

  export type DeliveryTypeCollection = DeliveryType[];

  export type DropOffDayCollection = DropOffDay[];

  export type ShipmentCollection = Shipment[];

  export interface CustomsDeclaration {
    contents: number;
    invoice?: string;
    items: CustomsDeclarationItemCollection;
    weight: number;
  }

  export interface CustomsDeclarationItem {
    amount: number;
    classification?: string;
    country?: string;
    description?: string;
    itemValue: Currency;
    weight: number;
  }

  export interface DeliveryOptions {
    carrier?: string;
    date?: Record<string, unknown>;
    deliveryType?: string;
    labelAmount: number;
    packageType?: string;
    pickupLocation?: RetailLocation;
    shipmentOptions: ShipmentOptions;
  }

  export interface DeliveryType {
    id?: number;
    name?: string;
  }

  export interface DropOffDay {
    cutoffTime?: string;
    date: Record<string, unknown>;
    dispatch?: boolean;
    sameDayCutoffTime?: string;
    weekday: number;
  }

  export interface Label {
    link: string;
    pdf: string;
  }

  export interface PackageType {
    id?: number;
    name?: string;
  }

  export interface PhysicalProperties {
    height?: number;
    length?: number;
    weight?: number;
    width?: number;
  }

  export interface RetailLocation {
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

  export interface Shipment {
    apiKey?: string;
    barcode?: string;
    carrier?: CarrierOptions;
    collectionContact?: string;
    created?: Record<string, unknown>;
    createdBy?: string;
    customsDeclaration?: CustomsDeclaration;
    delayed?: boolean;
    delivered?: boolean;
    deliveryOptions: DeliveryOptions;
    dropOffPoint?: RetailLocation;
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
    physicalProperties?: PhysicalProperties;
    recipient?: ContactDetails;
    referenceIdentifier?: string;
    sender?: ContactDetails;
    shopId?: number;
    status?: number;
    updated?: boolean;
  }

  export interface ShipmentOptions {
    ageCheck?: boolean;
    insurance?: number;
    labelDescription?: boolean;
    largeFormat?: boolean;
    onlyRecipient?: boolean;
    return?: boolean;
    sameDayDelivery?: boolean;
    signature?: boolean;
  }

  export interface ShipmentRepository {
    api: unknown;
    storage: unknown;
    storageHashMap: unknown;
  }

  export interface GetLabelsAsPdfRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetLabelsRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface GetShipmentsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface PostReturnShipmentsRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface PostShipmentsRequest {
    body: unknown;
    collection: unknown;
    headers: unknown;
    httpMethod: unknown;
    parameters: unknown;
    path: unknown;
  }

  export interface UpdateShipmentsRequest {
    body: unknown;
    headers: unknown;
    httpMethod: unknown;
    ids: unknown;
    parameters: unknown;
    path: unknown;
    referenceIdentifiers: unknown;
    size: unknown;
  }

  export interface GetLabelsPdfResponse {
    pdf: unknown;
  }

  export interface GetLabelsResponse {
    labelLink: unknown;
  }

  export interface GetShipmentsResponse {
    shipments: unknown;
  }

  export interface PostShipmentsResponse {
    ids: unknown;
  }

  export interface DeliveryDateService {

  }

  export interface DeliveryOptionsMerger {

  }

  export interface AbstractStorage {

  }

  export interface StorageInterface {

  }

  export interface MemoryCacheStorage {
    data: unknown;
  }
}
