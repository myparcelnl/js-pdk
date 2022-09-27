declare global {
  interface ObjectConstructor {
    /**
     * Returns an array of K/values of the enumerable properties of an object.
     *
     * @param o - Object that contains the properties and methods. This can be an object that you created or an
     *   existing Document Object Model (DOM) object.
     */
    entries<T>(o: T): T extends ArrayLike<infer U> ? [string, U][] : {[K in keyof T]: [K, T[K]]}[keyof T][];

    /**
     * @param o - Object that contains the properties and methods. This can be an object that you created or an
     *   existing Document Object Model (DOM) object.
     */
    keys<T>(o: T): T extends ArrayLike<infer U> ? string[] : {[K in keyof T]: K}[keyof T][];

    /**
     * Returns an array of values of the enumerable properties of an object.
     *
     * @param o - Object that contains the properties and methods. This can be an object that you created or an
     *   existing Document Object Model (DOM) object.
     */
    values<T>(o: T): T extends ArrayLike<infer U> ? U[] : T[keyof T][];
  }
}
