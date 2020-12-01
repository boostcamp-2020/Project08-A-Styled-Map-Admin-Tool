import mapboxgl from 'mapbox-gl';
import {
  ElementNameType,
  SubElementNameType,
  StyleType,
} from '../../store/common/type';

export interface stylingProps {
  map: mapboxgl.Map;
  subFeatureName: string;
  detailName: ElementNameType;
  key: string;
  subDetailName: SubElementNameType;
  style: StyleType;
}

export { default as poi } from './poi';
export { default as road } from './road';
export { default as water } from './water';
export { default as marker } from './marker';
export { default as administrative } from './administrative';
export { default as transit } from './transit';
export { default as landscape } from './landscape';
