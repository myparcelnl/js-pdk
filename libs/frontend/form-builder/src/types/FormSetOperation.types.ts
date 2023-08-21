import {type WithTarget, type WithValue} from './common.types';
import {type WithCondition} from './FormCondition.types';

export interface FormSetValueOperation {
  $setValue: WithValue & Partial<WithCondition> & Partial<WithTarget>;
}
