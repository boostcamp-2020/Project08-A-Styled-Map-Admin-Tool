import { init, setStyle, setWholeStyle } from '../style/action';

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

export interface FeaturePropsType {
  feature: FeatureNameType;
  subFeature: string;
}

export interface ElementPropsType extends FeaturePropsType {
  element: ElementNameType;
  subElement?: SubElementNameType;
}

export type ActionType =
  | ReturnType<typeof init>
  | ReturnType<typeof setStyle>
  | ReturnType<typeof setWholeStyle>;

export interface ActionPayload extends ElementPropsType {
  style: StyleType;
}

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

export type WholeStyleActionPayload = {
  [featureName in FeatureNameType]?: {
    [subFeatureName: string]: ElementActionPayload;
  };
};

export interface StylePropsType {
  [SubElementNameType.fill]: string;
  [SubElementNameType.stroke]: string;
}

export type PropertyType = {
  [featureName in FeatureNameType]: {
    [subFeatureName: string]: {
      [ElementNameType.section]?: StylePropsType | null;
      [ElementNameType.labelText]?: StylePropsType | null;
      [ElementNameType.labelIcon]?: string | null;
    };
  };
};
