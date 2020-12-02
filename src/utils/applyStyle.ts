/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
import mapboxgl from 'mapbox-gl';
import { StyleKeyName } from '../store/common/type';
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

type ColorType = keyof typeof ColorTypeName;
type WeightType = keyof typeof WeightTypeName;

export enum VisibilityType {
  visibility = 'visibility',
}

export type styleTypes = VisibilityType | ColorType | WeightType;

interface ApplyColorProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color: string;
  type: ColorType;
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
        `hsl(${h}, ${50 + saturation / 2}%, ${l}%)`
      );
    });
  }
  if (lightness) {
    return layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${s}%, ${50 + lightness / 2}%)`
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
  weight: number
): void {
  const weightValue = weight === 0 ? 0 : weight * 2 + 1;
  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, weightValue);
  });
}
