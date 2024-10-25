import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runCodeEditorTest = ((component) => {
  const suite = new TestSuite(AdminComponent.CodeEditor, component);

  suite.createInputOptions('test');

  suite.runCommonComponentTests();
}) satisfies AdminComponentTest;
