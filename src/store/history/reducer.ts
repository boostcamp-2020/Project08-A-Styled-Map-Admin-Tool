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
  isHistoryOpen: false,
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
        log: log.map((item: localStorageProps) => {
          return { id: item.id, display: item.display };
        }),
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
      } = action.payload as HistoryInfoPropsType;

      const id = getRandomId(8);
      const newState = JSON.parse(JSON.stringify(state));

      newState.log.push({
        id,
        display: `${feature} -> ${subFeature} -> ${element} -> ${subElement}에서 ${changedKey} 항목에 대하여\n ${value}로의 변화가 있었습니다.`,
      });
      const storedLog =
        localStorage.getItem('log') === null
          ? []
          : JSON.parse(localStorage.getItem('log') as string);

      if (storedLog !== undefined) {
        storedLog.push({
          id,
          value,
          display: `${feature} -> ${subFeature} -> ${element} -> ${subElement}에서 ${changedKey} 항목에 대하여\n ${value}로의 변화가 있었습니다.`,
          changedKey,
          feature,
          subFeature,
          element,
          subElement,
          style,
        });
        localStorage.setItem('log', JSON.stringify(storedLog));
      }

      return newState;
    }

    default:
      return {
        ...state,
        isHistoryOpen: false,
      };
  }
}

export default historyReducer;
