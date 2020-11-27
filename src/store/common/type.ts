export type ElementNameType = 'section' | 'labelText' | 'labelIcon';
export type SubElementNameType = 'fill' | 'stroke';

export type FeatureNameOneType = 'water' | 'marker';
export type FeatureNameMultiType =
  | 'poi'
  | 'administrative'
  | 'landscape'
  | 'road'
  | 'transit';
export type FeatureNameType = FeatureNameMultiType | FeatureNameOneType;

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
  feature: string;
  element: ElementNameType;
  subElement?: SubElementNameType;
  style: StyleType;
};
