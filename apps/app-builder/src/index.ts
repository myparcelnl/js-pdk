import Liftoff from 'liftoff';
import createDebug from 'debug';
import {jsVariants} from 'interpret';
import {run} from './run';

const debug = createDebug('pdk-builder:main');

const extensions = {
  ...jsVariants,
  ...Object.entries(jsVariants).reduce((acc, [key, value]) => ({...acc, [`.config${key}`]: value}), {}),
};

const pdkBuilder = new Liftoff({
  name: 'pdk-builder',
  configName: 'pdk',
  processTitle: 'pdk-builder',
  extensions,
});

function onExecute(this: Liftoff, env: Liftoff.LiftoffEnv, argv: string[]) {
  debug('onExecute', env, argv);
  run(env, argv);
}

function onPrepare(env: Liftoff.LiftoffEnv): void {
  debug('onPrepare', env);
  pdkBuilder.execute(env, onExecute);
}

pdkBuilder.prepare({}, onPrepare);
