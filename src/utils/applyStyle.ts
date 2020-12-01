import mapboxgl from 'mapbox-gl';
import { hexToHSL } from './colorFormat';

export enum ColorTypeName {
  'fill-color' = 'fill-color',
  'line-color' = 'line-color',
  'text-color' = 'text-color',
  'text-halo-color' = 'text-halo-color',
}

export enum WeightTypeName {
  'line-width' = 'line-width',
  'text-size' = 'text-size',
  'text-halo-width' = 'text-halo-width',
}

type colorType = keyof typeof ColorTypeName;
type weightType = keyof typeof WeightTypeName;

interface ApplyColorProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color: string;
  type: colorType;
  saturation?: string;
  lightness?: string;
}

export function applyVisibility(
  map: mapboxgl.Map,
  layerNames: string[],
  visibility: string
): void {
  layerNames.forEach((layerName) => {
    if (visibility === 'inherit') {
      map.setLayoutProperty(layerName, 'visibility', 'visible');
    } else map.setLayoutProperty(layerName, 'visibility', visibility);
  });
}

export function applyColor({
  map,
  layerNames,
  color,
  type,
  saturation,
  lightness,
}: ApplyColorProps): void {
  const { h, s, l } = hexToHSL(color);
  if (saturation) {
    return layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${50 + parseInt(saturation, 10) / 2}%, ${l}%)`
      );
    });
  }
  if (lightness) {
    return layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${s}%, ${50 + parseInt(lightness, 10) / 2}%)`
      );
    });
  }
  return layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, `hsl(${h}, ${s}%, ${l}%)`);
  });
}

export function applyWeight(
  map: mapboxgl.Map,
  layerNames: string[],
  type: weightType,
  weight: string
): void {
  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, parseInt(weight, 10) * 2 + 1);
  });
}
