import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
} from '../common/type';

export const INIT_HISTORY = 'INIT_HISTORY' as const;
export const ADD_LOG = 'ADD_LOG' as const;

export const initHistory = ({ log }: HistoryPropsType): HistoryActionType => ({
  type: INIT_HISTORY,
  payload: null,
});

export const addLog = (info: HistoryInfoPropsType): HistoryActionType => ({
  type: ADD_LOG,
  payload: info,
});
