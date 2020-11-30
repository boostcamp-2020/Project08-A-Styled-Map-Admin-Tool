import mapboxgl from 'mapbox-gl';
import { hexToHSL } from './colorFormat';

type colorType = 'fill-color' | 'line-color' | 'text-color' | 'text-halo-color';
type weightType = 'line-width' | 'text-halo-width' | 'text-size';

export function applyVisibility(
  map: mapboxgl.Map,
  layerName: string,
  visibility: string
): void {
  map.setLayoutProperty(layerName, 'visibility', visibility);
}

export function applyColor(
  map: mapboxgl.Map,
  layerName: string,
  type: colorType,
  color: string
): void {
  const { h, s, l } = hexToHSL(color);
  map.setPaintProperty(layerName, type, `hsl(${h}, ${s}%, ${l}%)`);
}

export function applyWeight(
  map: mapboxgl.Map,
  layerName: string,
  type: weightType,
  weight: number
): void {
  map.setPaintProperty(layerName, type, weight * 2 + 1);
}

export function applySaturation(
  map: mapboxgl.Map,
  layerName: string,
  type: colorType,
  color: string,
  saturation: number
): void {
  const { h, l } = hexToHSL(color);
  map.setPaintProperty(
    layerName,
    type,
    `hsl(${h}, ${50 + saturation / 2}%, ${l}%)`
  );
}

export function applyLightness(
  map: mapboxgl.Map,
  layerName: string,
  type: colorType,
  color: string,
  lightness: number
): void {
  const { h, s } = hexToHSL(color);
  map.setPaintProperty(
    layerName,
    type,
    `hsl(${h}, ${s}%, ${50 + lightness / 2}%)`
  );
}
