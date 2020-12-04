import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
} from '../common/type';

export const SET_FEATURE = 'SET_FEATURE' as const;
export const SET_SUBFEATURE = 'SET_SUBFEATURE' as const;
export const SET_ELEMENT = 'SET_ELEMENT' as const;
export const SET_SUBELEMENT = 'SET_SUBELEMENT' as const;

export interface SidebarActionType {
  type:
    | typeof SET_FEATURE
    | typeof SET_SUBFEATURE
    | typeof SET_ELEMENT
    | typeof SET_SUBELEMENT;
  payload: {
    feature?: FeatureNameType;
    subFeature?: string;
    element?: ElementNameType;
    subElement?: SubElementNameType;
  };
}

export const setFeature = (feature: FeatureNameType): SidebarActionType => ({
  type: SET_FEATURE,
  payload: { feature },
});

export const setSubFeature = (subFeature: string): SidebarActionType => ({
  type: SET_SUBFEATURE,
  payload: { subFeature },
});

export const setElement = (element: ElementNameType): SidebarActionType => ({
  type: SET_ELEMENT,
  payload: { element },
});

export const setSubElement = (
  subElement: SubElementNameType
): SidebarActionType => ({
  type: SET_SUBELEMENT,
  payload: { subElement },
});
