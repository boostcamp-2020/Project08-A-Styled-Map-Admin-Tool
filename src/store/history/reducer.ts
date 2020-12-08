import { ADD_LOG, INIT_HISTORY } from './action';
import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
} from '../common/type';
import getRandomId from '../../utils/getRandomId';

const initialState: HistoryPropsType = {
  log: [],
  currentIdx: null,
};

function historyReducer(
  state: HistoryPropsType = initialState,
  action: HistoryActionType
): HistoryPropsType {
  switch (action.type) {
    case INIT_HISTORY: {
      const localStorageLog = JSON.parse(localStorage.getItem('log') as string);

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

      if (newState.log.length >= 100) newState.log.shift(); // localstorage에서도 빼는 작업이 필요하겠네요!

      newState.log.push({
        id,
        ...JSON.parse(JSON.stringify(action.payload)),
      });
      newState.currentIdx = newState.log.length - 1;

      const storedLog =
        localStorage.getItem('log') === null
          ? []
          : JSON.parse(localStorage.getItem('log') as string);

      // TODO: localstorage update before Event(refresh, close..)
      if (storedLog !== undefined) {
        storedLog.push({
          id,
          ...JSON.parse(JSON.stringify(action.payload)),
        });
        localStorage.setItem('log', JSON.stringify(storedLog));
      }

      return newState;
    }

    default:
      return state;
  }
}

export default historyReducer;
