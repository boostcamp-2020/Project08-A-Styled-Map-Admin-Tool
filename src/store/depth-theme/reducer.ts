/* eslint-disable no-case-declarations */
import { DepthItemKeyTypes } from '../../hooks/sidebar/useSidebarDepthItem';
import {
  DepthThemeActionType,
  DepthThemePropsType,
  SET_SHOW_DEPTH_PROPERTIES,
  SET_THEME_PROPERTIES,
} from './action';

const initialState: DepthThemePropsType = {
  selectedFeature: DepthItemKeyTypes.road,
  roadDepth: 3,
  administrativeDepth: 3,
  themeIdx: 0,
};

function depthThemeReducer(
  state: DepthThemePropsType = initialState,
  action: DepthThemeActionType
): DepthThemePropsType {
  const { type, payload } = action;

  switch (type) {
    case SET_SHOW_DEPTH_PROPERTIES:
      const { selectedFeature, selectedDepth } = payload;
      const changedDepth =
        selectedFeature === DepthItemKeyTypes.road
          ? { roadDepth: selectedDepth }
          : { administrativeDepth: selectedDepth };
      return {
        ...state,
        ...changedDepth,
      };

    case SET_THEME_PROPERTIES:
      const { themeIdx } = payload;
      return {
        ...state,
        themeIdx,
      };

    default:
      return state;
  }
}

export default depthThemeReducer;
