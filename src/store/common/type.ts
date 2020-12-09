import {
  init,
  replaceWholeStyle,
  setStyle,
  setWholeStyle,
} from '../style/action';
import { setSidebarProperties, initSidebarProperties } from '../sidebar/action';
import { INIT_HISTORY, ADD_LOG, SET_CURRENT_INDEX } from '../history/action';

export type hello = 'landmark';

export enum ElementNameType {
  section = 'section',
  labelText = 'labelText',
  labelIcon = 'labelIcon',
}

export enum SubElementNameType {
  fill = 'fill',
  stroke = 'stroke',
}

export enum StyleKeyType {
  visibility = 'visibility',
  color = 'color',
  weight = 'weight',
  saturation = 'saturation',
  lightness = 'lightness',
  isChanged = 'isChanged',
}

export enum VisibilityValueType {
  visiable = 'visiable',
  none = 'none',
  inherit = 'inherit',
}

export enum FeatureNameType {
  poi = 'poi',
  administrative = 'administrative',
  landscape = 'landscape',
  road = 'road',
  transit = 'transit',
  water = 'water',
  marker = 'marker',
}

export enum SidebarProperties {
  feature = 'feature',
  subFeature = 'subFeature',
  element = 'element',
  subElement = 'subElement',
}

export enum PoiNameType {
  all = 'all',
  landmark = 'landmark',
  business = 'business',
  government = 'government',
  medical = 'medical',
  park = 'park',
  worship = 'worship',
  school = 'school',
  sports = 'sports',
  etc = 'etc',
}

export enum RoadNameType {
  all = 'all',
  arterial = 'arterial',
  local = 'local',
  sidewalk = 'sidewalk',
}

export enum AdministrativeNameType {
  all = 'all',
  country = 'country',
  state = 'state',
  locality = 'locality',
}

export enum LandScapeNameType {
  all = 'all',
  'human-made' = 'human-made',
  building = 'building',
  natural = 'natural',
  landcover = 'landcover',
  mountain = 'mountain',
}

export enum TransitNameType {
  all = 'all',
  airport = 'airport',
  bus = 'bus',
  rail = 'rail',
  subway = 'subway',
}

export enum WaterNameType {
  all = 'all',
}

export enum MarkerNameType {
  all = 'all',
}

export const SubFeatureNameType = {
  ...PoiNameType,
  ...RoadNameType,
  ...LandScapeNameType,
  ...TransitNameType,
  ...AdministrativeNameType,
  ...WaterNameType,
  ...MarkerNameType,
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SubFeatureNameType = typeof SubFeatureNameType;

export interface objType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export interface StyleType {
  isChanged: boolean;
  visibility: string;
  color: string;
  weight: number;
  saturation: number;
  lightness: number;
}
export interface SubElementType {
  fill: StyleType;
  stroke: StyleType;
}
export interface FeatureType {
  isChanged: boolean;
  section: SubElementType | null;
  labelText: SubElementType | null;
  labelIcon: StyleType | null;
}
export interface FeatureState {
  [name: string]: FeatureType;
}

export interface FeaturePropsType {
  feature: FeatureNameType;
  subFeature: string;
}

export interface ElementPropsType extends FeaturePropsType {
  element: ElementNameType;
  subElement?: SubElementNameType;
}

export type SidebarActionType =
  | ReturnType<typeof setSidebarProperties>
  | ReturnType<typeof initSidebarProperties>;

export type ActionType =
  | ReturnType<typeof init>
  | ReturnType<typeof setStyle>
  | ReturnType<typeof setWholeStyle>
  | ReturnType<typeof replaceWholeStyle>;

/** Style Store Type for Replace */
export type StyleStoreType = {
  [featureName in FeatureNameType]: FeatureState;
};

/** History Type */
export interface HistoryInfoPropsType {
  id?: string;
  changedValue: string | number;
  changedKey: StyleKeyType;
  feature: FeatureNameType;
  subFeature: string;
  element: ElementNameType;
  subElement: SubElementNameType;
  style: StyleType;
  wholeStyle: StyleStoreType;
}

export interface HistoryPropsType {
  log?: HistoryInfoPropsType[];
  currentIdx: number | null;
}

export interface SetIndexPayload {
  currentIndex: number;
}

export interface HistoryActionType {
  type: typeof INIT_HISTORY | typeof ADD_LOG | typeof SET_CURRENT_INDEX;
  payload:
    | null
    | SetIndexPayload
    | {
        changedKey: StyleKeyType;
        feature: FeatureNameType;
        subFeature: string;
        element: ElementNameType;
        subElement?: SubElementNameType;
        wholeStyle: StyleStoreType;
      };
}

export interface ActionPayload extends ElementPropsType {
  style: StyleType;
}

export interface PayloadPropsType {
  key: 'feature' | 'subFeature' | 'element' | 'subElement';
  feature: FeatureNameType | null;
  subFeature: string | null;
  element: ElementNameType | null;
  subElement: SubElementNameType | null;
}

/** Whole Style Type for Set */
export interface StyleActionPayload {
  isChanged?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}
export interface SubElementActionPayload {
  [SubElementNameType.fill]?: StyleActionPayload;
  [SubElementNameType.stroke]?: StyleActionPayload;
}

export interface ElementActionPayload {
  [ElementNameType.section]?: SubElementActionPayload;
  [ElementNameType.labelText]?: SubElementActionPayload;
  [ElementNameType.labelIcon]?: StyleActionPayload;
}

export interface SubFeatureActionPayload {
  [subFeatureName: string]: ElementActionPayload;
}

export type WholeStyleActionPayload = {
  [featureName in FeatureNameType]?: SubFeatureActionPayload;
};

export interface StylePropsType {
  [SubElementNameType.fill]: string;
  [SubElementNameType.stroke]: string;
}

export interface StyleElementPropsType {
  [ElementNameType.section]?: StylePropsType | null;
  [ElementNameType.labelText]?: StylePropsType | null;
  [ElementNameType.labelIcon]?: string | null;
}

export type FeaturePropertyType = {
  [subFeatureName: string]: StyleElementPropsType;
};

export type PropertyType = {
  [featureName in FeatureNameType]: FeaturePropertyType;
};

/** urlJson Type */
export interface URLJsonStyleType {
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}

export type URLJsonSubElementType = {
  [subElementName in SubElementNameType]?: URLJsonStyleType;
};

export type URLJsonElementType = {
  [ElementNameType.section]?: URLJsonSubElementType;
  [ElementNameType.labelText]?: URLJsonSubElementType;
  [ElementNameType.labelIcon]?: URLJsonStyleType;
};

export type URLJsonSubFeatureType = {
  [subFeatureName: string]: URLJsonElementType;
};

export type URLJsonType = {
  [featureName in FeatureNameType]?: URLJsonSubFeatureType;
};
