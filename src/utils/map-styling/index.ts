import mapboxgl from 'mapbox-gl';
import {
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
  StyleType,
} from '../../store/common/type';

export interface stylingProps {
  map: mapboxgl.Map;
  subFeature: string;
  element: ElementNameType;
  subElement: SubElementNameType;
  key: StyleKeyType;
  style: StyleType;
}

export { default as poi } from './poi';
export { default as road } from './road';
export { default as water } from './water';
export { default as marker } from './marker';
export { default as administrative } from './administrative';
export { default as transit } from './transit';
export { default as landscape } from './landscape';
