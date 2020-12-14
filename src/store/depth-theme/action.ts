import { DepthItemKeyTypes } from '../../hooks/sidebar/useSidebarDepthItem';

export const SET_SHOW_DEPTH_PROPERTIES = 'SET_SHOW_DEPTH_PROPERTIES' as const;
export const SET_THEME_PROPERTIES = 'SET_THEME_PROPERTIES' as const;
export const INIT_DEPTH_THEME = 'INIT_DEPTH_THEME';

export interface DepthPropsType {
  selectedFeature: DepthItemKeyTypes;
  selectedDepth: number;
}

export interface ThemePropsType {
  themeIdx: number;
}

export interface DepthThemeState extends ThemePropsType {
  roadDepth: number;
  administrativeDepth: number;
}

export interface DepthThemeActionType {
  type:
    | typeof SET_SHOW_DEPTH_PROPERTIES
    | typeof SET_THEME_PROPERTIES
    | typeof INIT_DEPTH_THEME;
  payload: DepthPropsType | ThemePropsType;
}

export const setShowDepthProperties = ({
  selectedFeature,
  selectedDepth,
}: DepthPropsType): DepthThemeActionType => ({
  type: SET_SHOW_DEPTH_PROPERTIES,
  payload: { selectedFeature, selectedDepth },
});

export const setThemeProperties = ({
  themeIdx,
}: ThemePropsType): DepthThemeActionType => ({
  type: SET_THEME_PROPERTIES,
  payload: { themeIdx },
});

export const initDepthTheme = (): { type: typeof INIT_DEPTH_THEME } => ({
  type: INIT_DEPTH_THEME,
});
