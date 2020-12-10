import { DepthItemKeyTypes } from '../../hooks/sidebar/useSidebarDepthItem';

export const SET_SHOW_DEPTH_PROPERTIES = 'SET_SHOW_DEPTH_PROPERTIES' as const;
export const SET_THEME_PROPERTIES = 'SET_THEME_PROPERTIES' as const;

export interface DepthThemePropsType {
  selectedFeature?: DepthItemKeyTypes;
  selectedDepth?: number;
  roadDepth?: number;
  administrativeDepth?: number;
  themeIdx?: number;
}

export interface DepthThemeActionType {
  type: typeof SET_SHOW_DEPTH_PROPERTIES | typeof SET_THEME_PROPERTIES;
  payload: DepthThemePropsType;
}

export const setShowDepthProperties = ({
  selectedFeature,
  selectedDepth,
}: DepthThemePropsType): DepthThemeActionType => ({
  type: SET_SHOW_DEPTH_PROPERTIES,
  payload: { selectedFeature, selectedDepth },
});

export const setThemeProperties = ({
  themeIdx,
}: DepthThemePropsType): DepthThemeActionType => ({
  type: SET_THEME_PROPERTIES,
  payload: { themeIdx },
});
