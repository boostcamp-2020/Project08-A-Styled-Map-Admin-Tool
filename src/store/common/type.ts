import { init, setStyle } from '../style/action';

export enum ElementName {
  section = 'section',
  labelText = 'labelText',
  labelIcon = 'labelIcon',
}

export enum SubElementName {
  fill = 'fill',
  stroke = 'stroke',
}

export enum StyleKeyName {
  visibility = 'visibility',
  color = 'color',
  weight = 'weight',
  saturation = 'saturation',
  lightness = 'lightness',
  isChanged = 'isChanged',
}

export enum FeatureName {
  poi = 'poi',
  administrative = 'administrative',
  landscape = 'landscape',
  road = 'road',
  transit = 'transit',
  water = 'water',
  marker = 'marker',
}

export type ElementNameType = keyof typeof ElementName;
export type SubElementNameType = keyof typeof SubElementName;
export type FeatureNameType = keyof typeof FeatureName;
export type StyleKeyType = keyof typeof StyleKeyName;

export interface objType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export interface StyleType {
  isChanged: boolean;
  visibility: string;
  color: string;
  weight: string;
  saturation: string;
  lightness: string;
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

export type ActionType = ReturnType<typeof init> | ReturnType<typeof setStyle>;

export type ActionPayload = {
  feature: FeatureNameType;
  subFeature?: string;
  element: ElementNameType;
  subElement?: SubElementNameType;
  style: StyleType;
};
