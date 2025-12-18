import '@myparcel-dev/vue-form-builder';

declare module '@myparcel-dev/vue-form-builder' {
  // Re-add fields to FormConfiguration (removed in beta.44+)
  export interface FormConfiguration {
    fields?: unknown[];
  }

  // Re-add lifecycle hooks to FieldConfiguration (removed from types but still work at runtime)
  export interface FieldConfiguration {
    onBeforeMount?(instance: FieldInstance): Promise<void> | void;
    onMounted?(instance: FieldInstance): Promise<void> | void;
  }
}
