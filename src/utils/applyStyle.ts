/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
import mapboxgl from 'mapbox-gl';
import { hexToHSL } from './colorFormat';

export enum ColorType {
  fill = 'fill-color',
  line = 'line-color',
  text = 'text-color',
  background = 'background-color',
  textHalo = 'text-halo-color',
  icon = 'icon-opacity',
}

export enum WeightType {
  line = 'line-width',
  textHalo = 'text-halo-width',
}

interface ApplyProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color?: string;
  type?: StyleTypes;
  saturation?: number;
  lightness?: number;
  weight?: number;
  visibility?: string;
}

export enum VisibilityType {
  visibility = 'visibility',
}

export type StyleTypes = VisibilityType | ColorType | WeightType;

export function applyColor({
  map,
  layerNames,
  color,
  type,
  saturation,
  lightness,
}: ApplyProps): void {
  if (!type || !color) return;
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

export function applyVisibility({
  map,
  layerNames,
  visibility,
}: ApplyProps): void {
  layerNames.forEach((layerName) => {
    if (visibility === 'inherit') {
      map.setLayoutProperty(layerName, 'visibility', 'visible');
    } else map.setLayoutProperty(layerName, 'visibility', visibility);
  });
}

export function applyWeight({
  map,
  layerNames,
  type,
  weight = 1,
}: ApplyProps): void {
  if (!type) return;

  const weightValue = weight === 0 ? 0 : weight;
  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, weightValue);
  });
}
