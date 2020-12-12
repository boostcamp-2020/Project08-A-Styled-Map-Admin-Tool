/* eslint-disable no-case-declarations */
import {
  DepthThemeActionType,
  DepthThemeState,
  DepthPropsType,
  ThemePropsType,
  SET_SHOW_DEPTH_PROPERTIES,
  SET_THEME_PROPERTIES,
  INIT_DEPTH_THEME,
} from './action';

const initialState: DepthThemeState = {
  roadDepth: 3,
  administrativeDepth: 3,
  themeIdx: 0,
};

function depthThemeReducer(
  state: DepthThemeState = initialState,
  action: DepthThemeActionType
): DepthThemeState {
  const { type, payload } = action;

  switch (type) {
    case SET_SHOW_DEPTH_PROPERTIES:
      const { selectedFeature, selectedDepth } = payload as DepthPropsType;

      return {
        ...state,
        [selectedFeature]: selectedDepth,
      };

    case SET_THEME_PROPERTIES:
      const { themeIdx } = payload as ThemePropsType;
      return {
        ...state,
        themeIdx,
      };

    case INIT_DEPTH_THEME:
      return initialState;

    default:
      return state;
  }
}

export default depthThemeReducer;
