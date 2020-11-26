import {
  getLabel,
  getSection,
  LabelType,
  CommonType,
} from '../common/properties';

import {
  INIT,
  SET_SECTION,
  SET_LABEL_TEXT,
  SET_LABEL_ICON,
  ActionType,
} from '../common/action';

export interface WaterType {
  isChanged: boolean;
  section: CommonType;
  label: LabelType;
}

const initialState = {
  isChanged: false,
  section: getSection(),
  label: getLabel(),
};

export default function waterReducer(
  state: WaterType = initialState,
  action: ActionType
): WaterType {
  switch (action.type) {
    case INIT:
      return initialState;
    case SET_SECTION: {
      const { feature, element, style } = action.payload;
      if (feature !== 'water') return state;

      const newState = JSON.parse(JSON.stringify(state));
      newState.section[element as string] = style;

      return newState;
    }
    case SET_LABEL_TEXT: {
      const { feature, element, style } = action.payload;
      if (feature !== 'water') return state;

      const newState = JSON.parse(JSON.stringify(state));
      newState.label.text[element as string] = style;

      return newState;
    }
    case SET_LABEL_ICON: {
      const { feature, style } = action.payload;
      if (feature !== 'water') return state;

      const newState = JSON.parse(JSON.stringify(state));
      newState.icon = style;

      return newState;
    }
    default:
      return state;
  }
}
