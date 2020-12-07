import { ADD_LOG, INIT_HISTORY } from './action';
import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleType,
} from '../common/type';
import getRandomId from '../../utils/getRandomId';

interface localStorageProps {
  id: string;
  value: string;
  display: string;
  changedKey: string | null;
  feature: FeatureNameType;
  subFeature: string | null;
  element: ElementNameType | null;
  subElement: SubElementNameType | null;
  style: StyleType;
}

const initialState: HistoryPropsType = {
  log: [],
};

function historyReducer(
  state: HistoryPropsType = initialState,
  action: HistoryActionType
): HistoryPropsType {
  switch (action.type) {
    case INIT_HISTORY: {
      const log = localStorage.getItem('log')
        ? JSON.parse(localStorage.getItem('log') as string)
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

      const display = `${feature} > ${subFeature} > ${element} > ${subElement}의 ${changedKey} 항목을\n ${value}로 변경`;
      newState.log.push({
        id,
        display,
      });
      const storedLog =
        localStorage.getItem('log') === null
          ? []
          : JSON.parse(localStorage.getItem('log') as string);

      if (storedLog !== undefined) {
        storedLog.push({
          id,
          value,
          display,
          changedKey,
          feature,
          subFeature,
          element,
          subElement,
          style,
          wholeStyle,
        });
        localStorage.setItem('log', JSON.stringify(storedLog));
      }

      return newState;
    }

    default:
      return {
        ...state,
      };
  }
}

export default historyReducer;
