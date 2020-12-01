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
  'text-halo-width' = 'text-halo-width',
}

type colorType = keyof typeof ColorTypeName;

type weightType = keyof typeof WeightTypeName;

interface ApplyColorProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color: string;
  type: colorType;
  saturation?: number;
  lightness?: number;
}

export function applyVisibility(
  map: mapboxgl.Map,
  layerNames: string[],
  visibility: string
): void {
  layerNames.forEach((layerName) => {
    map.setLayoutProperty(layerName, 'visibility', visibility);
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
    layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${50 + saturation / 2}%, ${l}%)`
      );
    });
    return;
  }
  if (lightness) {
    layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${s}%, ${50 + lightness / 2}%)`
      );
    });
    return;
  }
  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, `hsl(${h}, ${s}%, ${l}%)`);
  });
}

export function applyWeight(
  map: mapboxgl.Map,
  layerNames: string[],
  type: weightType,
  weight: number
): void {
  const weightValue = weight === 0 ? 0 : weight * 2 + 1;
  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, weightValue);
  });
}
