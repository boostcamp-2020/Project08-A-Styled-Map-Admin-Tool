/* eslint-disable no-case-declarations */
import {
  DepthThemeActionType,
  ThemDepthState,
  DepthPropsType,
  ThemePropsType,
  SET_SHOW_DEPTH_PROPERTIES,
  SET_THEME_PROPERTIES,
} from './action';

const initialState: ThemDepthState = {
  roadDepth: 3,
  administrativeDepth: 3,
  themeIdx: 0,
};

function depthThemeReducer(
  state: ThemDepthState = initialState,
  action: DepthThemeActionType
): ThemDepthState {
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

    default:
      return state;
  }
}

export default depthThemeReducer;
