import Liftoff from 'liftoff';
import {jsVariants} from 'interpret';
import {run} from './run';

export function start(): void {
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
    run(env, argv);
  }

  function onPrepare(env: Liftoff.LiftoffEnv): void {
    pdkBuilder.execute(env, onExecute);
  }

  pdkBuilder.prepare({}, onPrepare);
}
