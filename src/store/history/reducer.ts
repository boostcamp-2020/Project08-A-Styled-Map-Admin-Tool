import { ADD_LOG, INIT_HISTORY } from './action';
import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
} from '../common/type';
import getRandomId from '../../utils/getRandomId';

const logKey = 'log' as const;

const initialState: HistoryPropsType = {
  log: [],
};

function historyReducer(
  state: HistoryPropsType = initialState,
  action: HistoryActionType
): HistoryPropsType {
  switch (action.type) {
    case INIT_HISTORY: {
      const log = localStorage.getItem(logKey)
        ? JSON.parse(localStorage.getItem(logKey) as string)
        : [];

      return {
        ...state,
        log,
      };
    }
    case ADD_LOG: {
      const {
        value,
        changedKey,
        feature,
        subFeature,
        element,
        subElement,
        style,
        wholeStyle,
      } = action.payload as HistoryInfoPropsType;

      const id = getRandomId(8);
      const newState = JSON.parse(JSON.stringify(state));

      const newLog: HistoryInfoPropsType = {
        id,
        value,
        changedKey,
        feature,
        subFeature,
        element,
        subElement,
        style,
        wholeStyle,
      };
      newState.log.push(newLog);
      const storedLog =
        localStorage.getItem(logKey) === null
          ? []
          : JSON.parse(localStorage.getItem(logKey) as string);

      storedLog.push(newLog);
      localStorage.setItem(logKey, JSON.stringify(storedLog));

      return newState;
    }

    default:
      return {
        ...state,
      };
  }
}

export default historyReducer;
