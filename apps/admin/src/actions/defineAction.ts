import {type GenericActionDefinition, type NamedActionDefinition} from '../types';
import {type AdminAction} from '../data';

type DefineAction = {
  <A extends AdminAction>(input: NamedActionDefinition<A>): NamedActionDefinition<A>;
  <D extends GenericActionDefinition>(input: D): D;
};

// @ts-expect-error todo
export const defineAction: DefineAction = (input) => input;
