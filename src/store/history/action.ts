import { HistoryPropsType, HistoryActionType } from '../common/type';

export const INIT_HISTORY = 'INIT_HISTORY' as const;
export const TOGGLE_HISTORY = 'TOGGLE_HISTORY' as const;

export const initHistory = ({
  isHistoryOpen,
}: HistoryPropsType): HistoryActionType => ({
  type: INIT_HISTORY,
  payload: { isHistoryOpen },
});

export const toggleHistory = ({
  isHistoryOpen,
}: HistoryPropsType): HistoryActionType => ({
  type: TOGGLE_HISTORY,
  payload: { isHistoryOpen },
});
