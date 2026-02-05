import {ref, type Ref, type UnwrapRef} from 'vue';
import {type ShipmentOptionsRefs} from '../types';

export const createRef = <T>(refs: ShipmentOptionsRefs, field: string, fallback?: T): Ref<UnwrapRef<T>> => {
  return ref((refs[field] ?? fallback) as T) as Ref<UnwrapRef<T>>;
};
