import {type InjectionKey} from 'vue';
import {type AdminInstance} from './types/admin.types';
import {type PdkAdmin} from './pdk/PdkAdmin';

export const INJECT_ADMIN_INSTANCE: InjectionKey<AdminInstance> = Symbol('instance');

export const INJECT_GLOBAL_PDK_ADMIN: InjectionKey<PdkAdmin> = Symbol('admin');
