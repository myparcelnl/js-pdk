import {INJECT_CONTEXT_KEY, INJECT_INSTANCE, INJECT_PACKAGE_FORMAT} from '@/services/injections';
import Vue, {createApp} from 'vue';
import {ContextKey} from '@/data/global/context';
import {PackageFormat} from '@/data/global/definitions';
import {registerComponents} from '@/services/registerComponents';

type RenderCallback = (
  selector: string,
  data?: Record<string, unknown>,
  components?: string[],
) => Promise<Vue.ComponentPublicInstance>;
type Render = (componentPath: string) => RenderCallback;

/**
 * Create a function to render a new vue instance with given component.
 */
export const render: Render = (componentPath) => {
  const renderCallback: RenderCallback = async (selector, data?, components?: string[]) => {
    const component = (await import(`@/${componentPath}`)).default;

    const app = createApp(component);

    registerComponents(app, components ?? []);

    app.use((instance) => {
      instance.provide(INJECT_CONTEXT_KEY, ContextKey);
      instance.provide(INJECT_PACKAGE_FORMAT, PackageFormat);

      if (data) {
        instance.provide(INJECT_INSTANCE, data);
      }
    });

    return app.mount(selector);
  };

  return renderCallback;
};
