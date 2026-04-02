This is the JS-PDK. It is combined with the (PHP) PDK, also managed by us. The JS-PDK is mainly used for providing Vue-based UI elements for both the admin panel of our e-commerce plugins as well as providing features for the consumer-facing frontend checkout. It also works together with the Delivery Options standalone Vue repository, which is again managed by us.

# Future plans

We are creating plans for a major simplification of the JS-PDK. This is provided here as context not to do a major refactor now, but to ensure new features are added in a way that they can be easily migrated to the new structure when the time comes. The main goals of the refactor are:

- Simplify the codebase by removing unnecessary abstractions and layers.
- Improve maintainability and readability of the code.
- Reducing the complexity of the monorepo, removing anything that is not needed or not related to UI components.
- The repository should not define types and logic for specific carriers, their shipment options, etc.
- Types should be based off of the OpenAPI specification for the MyParcel API, rather than defining in constants and manually maintaining them.
- The goal for the above two points is to allow the JS-PDK to work with any new carrier, delivery type or shipment option at most needing a regeneration of the OpenApi-based types, but no manual code change
- The JS-PDK should mostly react to the context given to it by the PHP PDK / plugin and use OpenAPI types for type-safety.
