import { SidebarState } from '../common/type';

export const SET_SIDEBAR_PROPERTIES = 'SET_SIDEBAR_PROPERTIES' as const;
export const INIT_SIDEBAR_PROPERTIES = 'INIT_SIDEBAR_PROPERTIES' as const;

export interface SidebarActionType {
  type: typeof SET_SIDEBAR_PROPERTIES | typeof INIT_SIDEBAR_PROPERTIES;
  payload: SidebarState;
}

export const setSidebarProperties = ({
  key,
  feature,
  subFeature,
  element,
  subElement,
}: SidebarState): SidebarActionType => ({
  type: SET_SIDEBAR_PROPERTIES,
  payload: { key, feature, subFeature, element, subElement },
});

export const initSidebarProperties = ({
  key,
  feature,
  subFeature,
  element,
  subElement,
}: SidebarState): SidebarActionType => ({
  type: INIT_SIDEBAR_PROPERTIES,
  payload: { key, feature, subFeature, element, subElement },
});
