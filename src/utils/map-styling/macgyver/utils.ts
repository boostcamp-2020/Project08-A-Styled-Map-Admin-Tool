import { objType } from '../../../store/common/type';

export const VISIBLE = 1;
export const INVISIBLE = 0;

export function getIdsFromLayersArr(seperatedLayers: objType): string[] {
  if (!seperatedLayers) return [];
  return seperatedLayers.map((layer: { id: string; type: string }) => layer.id);
}

export function getIdsFromLayersArrWithType(
  seperatedLayers: objType,
  type: string
): string[] {
  if (!seperatedLayers) return [];
  return seperatedLayers
    .filter((layer: { id: string; type: string }) => type === layer.type)
    .map((layer: { id: string; type: string }) => layer.id);
}

export function getIdsFromLayersArrWithoutType(
  seperatedLayers: objType,
  type: string
): string[] {
  if (!seperatedLayers) return [];
  return seperatedLayers
    .filter((layer: { id: string; type: string }) => type !== layer.type)
    .map((layer: { id: string; type: string }) => layer.id);
}
