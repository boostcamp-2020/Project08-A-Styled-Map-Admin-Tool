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

export interface AdministrativeType {
  [name: string]: {
    isChanged: boolean;
    section: CommonType;
    label: LabelType;
  };
}

const ADMINISTRATIVE_IDX = 1;

const features = [
  'all',
  ...(renderingData[ADMINISTRATIVE_IDX].features?.map(
    (v) => v.key
  ) as string[]),
];

const initialState = features.reduce((acc: AdministrativeType, cur: string) => {
  acc[cur] = {
    isChanged: false,
    section: getSection(),
    label: getLabel(),
  };
  return acc;
}, {});

export default function administrativeReducer(
  state: AdministrativeType = initialState,
  action: ActionType
): AdministrativeType {
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
