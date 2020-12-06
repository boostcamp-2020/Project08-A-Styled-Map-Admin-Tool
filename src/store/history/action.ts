import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
} from '../common/type';

export const INIT_HISTORY = 'INIT_HISTORY' as const;
export const TOGGLE_HISTORY = 'TOGGLE_HISTORY' as const;
export const ADD_LOG = 'ADD_LOG' as const;

export const initHistory = ({
  isHistoryOpen,
  log,
}: HistoryPropsType): HistoryActionType => ({
  type: INIT_HISTORY,
  payload: { isHistoryOpen },
});

export const toggleHistory = ({
  isHistoryOpen,
  log,
}: HistoryPropsType): HistoryActionType => ({
  type: TOGGLE_HISTORY,
  payload: { isHistoryOpen },
});

export const addLog = (info: HistoryInfoPropsType): HistoryActionType => ({
  type: ADD_LOG,
  payload: info,
});
