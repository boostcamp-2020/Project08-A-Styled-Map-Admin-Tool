import { ADD_LOG, INIT_HISTORY, TOGGLE_HISTORY } from './action';
import {
  HistoryPropsType,
  HistoryActionType,
  HistoryInfoPropsType,
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleType,
} from '../common/type';
import randomId from '../../utils/randomId';

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

function historyReducer(
  state: HistoryPropsType,
  action: HistoryActionType
): HistoryPropsType {
  switch (action.type) {
    case INIT_HISTORY: {
      const log = localStorage.getItem('log')
        ? JSON.parse(localStorage.getItem('log') as string)
        : [];

      return {
        ...state,
        isHistoryOpen: false,
        log: log.map((item: localStorageProps) => {
          return { id: item.id, display: item.display };
        }),
      };
    }
    case TOGGLE_HISTORY: {
      return {
        ...state,
        isHistoryOpen: !state.isHistoryOpen,
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

      if (state.log !== undefined) {
        const id = randomId(8);
        state.log.push({
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
      }
      return {
        ...state,
      };
    }

    default:
      return {
        ...state,
        isHistoryOpen: false,
      };
  }
}

export default historyReducer;
