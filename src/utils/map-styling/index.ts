import mapboxgl from 'mapbox-gl';
import { ElementNameType, SubElementNameType } from '../../store/common/type';

export interface stylingProps {
  map: mapboxgl.Map;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName: SubElementNameType;
}

export { default as poi } from './poi';
export { default as road } from './road';
export { default as water } from './water';
export { default as marker } from './marker';
export { default as administrative } from './administrative';
export { default as transit } from './transit';
export { default as landscape } from './landscape';
