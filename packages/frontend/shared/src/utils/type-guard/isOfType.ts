/**
 * Type guard for checking if an object value is of a specific type by checking if a given K exists.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isOfType<T>(value: any, property: keyof T): value is T {
  return value?.hasOwnProperty(property) && undefined !== value[property];
}
