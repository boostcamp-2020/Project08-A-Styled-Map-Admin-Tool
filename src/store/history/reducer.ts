import { INIT_HISTORY, TOGGLE_HISTORY } from './action';
import { HistoryPropsType, HistoryActionType } from '../common/type';

function historyReducer(
  state: HistoryPropsType,
  action: HistoryActionType
): HistoryPropsType {
  switch (action.type) {
    case INIT_HISTORY: {
      return {
        isHistoryOpen: false,
      };
    }
    case TOGGLE_HISTORY: {
      return {
        isHistoryOpen: !state.isHistoryOpen,
      };
    }
    default:
      return { isHistoryOpen: false };
  }
}

export default historyReducer;
