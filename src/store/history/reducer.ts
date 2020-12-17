import {
  ADD_LOG,
  INIT_HISTORY,
  SET_CURRENT_INDEX,
  RESET_HISTORY,
} from './action';
import {
  HistoryState,
  HistoryActionType,
  HistoryInfoPropsType,
  SetIndexPayload,
} from '../common/type';
import getRandomId from '../../utils/getRandomId';

const logKey = 'log' as const;

const initialState: HistoryState = {
  log: [],
  currentIdx: null,
};

function historyReducer(
  state: HistoryState = initialState,
  action: HistoryActionType
): HistoryState {
  switch (action.type) {
    case INIT_HISTORY: {
      const localStorageLog = JSON.parse(
        localStorage.getItem(logKey) as string
      );

      const log = localStorageLog
        ? (localStorageLog as HistoryInfoPropsType[])
        : [];

      const currentIdx = log.length ? log.length - 1 : null;

      return {
        log,
        currentIdx,
      };
    }
    case ADD_LOG: {
      const id = getRandomId(8);
      const newState = JSON.parse(JSON.stringify(state));
      if (newState.log.length !== newState.currentIdx + 1) {
        newState.log.splice(newState.currentIdx + 1);
      }

      newState.log.push({ id, ...action.payload });
      newState.currentIdx = newState.log.length - 1;

      return newState as HistoryState;
    }

    case SET_CURRENT_INDEX: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.currentIdx = (action.payload as SetIndexPayload).currentIndex;
      return newState;
    }

    case RESET_HISTORY: {
      return { ...state, log: [], currentIdx: null };
    }
    default:
      return state;
  }
}

export default historyReducer;
