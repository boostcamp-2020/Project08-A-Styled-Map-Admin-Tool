import { HistoryActionType, HistoryInfoPropsType } from '../common/type';

export const INIT_HISTORY = 'INIT_HISTORY' as const;
export const ADD_LOG = 'ADD_LOG' as const;
export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX' as const;
export const RESET_HISTORY = 'RESET_HISTORY' as const;

export const initHistory = (): HistoryActionType => ({
  type: INIT_HISTORY,
  payload: null,
});

export const addLog = (info: HistoryInfoPropsType): HistoryActionType => ({
  type: ADD_LOG,
  payload: info,
});

export const setCurrentIndex = (currentIndex: number): HistoryActionType => ({
  type: SET_CURRENT_INDEX,
  payload: { currentIndex },
});

export const resetHistory = (): HistoryActionType => ({
  type: RESET_HISTORY,
  payload: null,
});
