import Liftoff from 'liftoff';
import createDebug from 'debug';
import {jsVariants} from 'interpret';
import {run} from './run';

const debug = createDebug('pdk-builder:main');

const pdkBuilder = new Liftoff({
  name: 'pdk-builder',
  configName: 'pdk',
  processTitle: 'pdk-builder',
  extensions: {
    ...jsVariants,
    rc: null,
  },
});

async function onExecute(this: Liftoff, env: Liftoff.LiftoffEnv, argv: string[]) {
  debug('onExecute', env, argv);
  console.log('onExecute', env, argv);
  await run(env, argv);
}

function onPrepare(env: Liftoff.LiftoffEnv): void {
  debug('onPrepare', env);
  console.log('onPrepare', env);
  pdkBuilder.execute(env, onExecute);
}

pdkBuilder.prepare({}, onPrepare);
