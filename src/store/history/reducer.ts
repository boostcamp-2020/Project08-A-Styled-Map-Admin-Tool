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
  objType,
} from '../common/type';
import getRandomId from '../../utils/getRandomId';
import deepCopy from '../../utils/deepCopy';

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
      const newState = deepCopy(state);
      if (newState.log.length !== newState.currentIdx + 1) {
        newState.log.splice(newState.currentIdx + 1);
      }

      newState.log.push({ id, ...action.payload });
      newState.currentIdx = newState.log.length - 1;

      const storedLog =
        localStorage.getItem(logKey) === null
          ? []
          : JSON.parse(localStorage.getItem(logKey) as string);

      // TODO: localstorage update before Event(refresh, close..)
      // localstorage에 업로드 할때 100개만 가져가면 되지 않을까요?
      if (storedLog !== undefined) {
        storedLog.push({
          id,
          ...deepCopy(action.payload as objType),
        });
        localStorage.setItem('log', JSON.stringify(storedLog));
      }

      return newState as HistoryState;
    }

    case SET_CURRENT_INDEX: {
      const newState = deepCopy(state) as HistoryState;
      newState.currentIdx = (action.payload as SetIndexPayload).currentIndex;
      return newState;
    }

    case RESET_HISTORY: {
      localStorage.setItem('log', JSON.stringify([]));

      return { ...state, log: [], currentIdx: null };
    }
    default:
      return state;
  }
}

export default historyReducer;
