import {computed, type ComputedRef} from 'vue';
import {useAdminConfig} from '../useAdminConfig';
import {type TableProps} from '../../types';

type UseTableContext = (props: TableProps) => {
  transition: ComputedRef<string | undefined>;
};

export const useTableContext: UseTableContext = (props) => {
  const config = useAdminConfig();

  const transition = computed(() => {
    return props.transition === false ? undefined : props.transition ?? config.transitions?.tableRow;
  });

  return {transition};
};
