import { init, setStyle } from './action';

export type ActionType = ReturnType<typeof init> | ReturnType<typeof setStyle>;
export type ElementNameType = 'section' | 'labelText' | 'labelIcon';
export type SubElementNameType = 'fill' | 'stroke';

export type FeatureNameSingleType = 'water' | 'marker';
export type FeatureNameMultiType =
  | 'poi'
  | 'administrative'
  | 'landscape'
  | 'road'
  | 'transit';
export type FeatureNameType = FeatureNameMultiType | FeatureNameSingleType;

export type StyleKeyType =
  | 'visibility'
  | 'color'
  | 'weight'
  | 'saturation'
  | 'lightness'
  | 'isChanged';

export interface objType {
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
export interface ElementType {
  fill: StyleType;
  stroke: StyleType;
}
export interface FeatureType {
  isChanged: boolean;
  section: ElementType;
  labelText: ElementType;
  labelIcon: StyleType;
}
export interface FeatureState {
  [name: string]: FeatureType;
}

export type ActionPayload = {
  feature: FeatureNameType;
  subFeature?: string;
  element: ElementNameType;
  subElement?: SubElementNameType;
  style: StyleType;
};
