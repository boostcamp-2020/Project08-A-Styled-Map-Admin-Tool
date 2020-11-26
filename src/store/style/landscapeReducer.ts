import renderingData from '../../utils/rendering-data/featureTypeData';

import {
  getLabel,
  getSection,
  LabelType,
  CommonType,
} from '../common/commonProperties';

import {
  INIT,
  SET_SECTION,
  SET_LABEL_TEXT,
  SET_LABEL_ICON,
  ActionType,
} from '../common/action';

export interface LandscapeType {
  [name: string]: {
    isChanged: boolean;
    section: CommonType;
    label: LabelType;
  };
}

// TODO 전체 arr 활성화할 경우 바뀌어야 함
const LANDSCAPE_IDX = 1;

const features = [
  'all',
  ...(renderingData[LANDSCAPE_IDX].features?.map((v) => v.key) as string[]),
];

const initialState = features.reduce((acc: LandscapeType, cur: string) => {
  acc[cur] = {
    isChanged: false,
    section: getSection(),
    label: getLabel(),
  };
  return acc;
}, {});

export default function landscapeReducer(
  state: LandscapeType = initialState,
  action: ActionType
): LandscapeType {
  switch (action.type) {
    case INIT:
      return initialState;
    case SET_SECTION: {
      const { feature, element, style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState[feature].section[element as string] = style;

      return newState;
    }
    case SET_LABEL_TEXT: {
      const { feature, element, style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState[feature].label.text[element as string] = style;

      return newState;
    }
    case SET_LABEL_ICON: {
      const { feature, style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState[feature].icon = style;

      return newState;
    }
    default:
      return state;
  }
}
