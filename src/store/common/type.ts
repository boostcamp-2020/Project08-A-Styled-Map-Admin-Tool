import { init, setStyle } from '../style/action';

export interface nice {
  poi:
    | 'all'
    | 'landmark'
    | 'business'
    | 'government'
    | 'medical'
    | 'park'
    | 'worship'
    | 'school'
    | 'sports'
    | 'etc';
  road: 'all';
  administrative: 'all' | 'country' | 'state' | 'locality';
  landscape: 'all';
  transit: 'all';
  water: 'all';
  marker: 'all';
}

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

export enum FeatureNameType {
  poi = 'poi',
  administrative = 'administrative',
  landscape = 'landscape',
  road = 'road',
  transit = 'transit',
  water = 'water',
  marker = 'marker',
}

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

export type ActionType = ReturnType<typeof init> | ReturnType<typeof setStyle>;

export type ActionPayload = {
  feature: FeatureNameType;
  subFeature: string;
  element: ElementNameType;
  subElement?: SubElementNameType;
  style: StyleType;
};

export interface HasPropertiesType {
  featureName: FeatureNameType;
  subFeatureName: string;
}

export interface PropertyType {
  [subFeatureType: string]: {
    [ElementNameType.section]?: {
      fill: string;
      stroke: string;
    } | null;
    [ElementNameType.labelText]?: {
      fill: string;
      stroke: string;
    } | null;
    [ElementNameType.labelIcon]?: string | null;
  };
}
