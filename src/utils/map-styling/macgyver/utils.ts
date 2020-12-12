import { objType } from '../../../store/common/type';

export const VISIBLE = 1;
export const INVISIBLE = 0;

export function getIdsFromSeperatedLayers(seperatedLayers: objType): string[] {
  return seperatedLayers.map((layer: { id: string; type: string }) => layer.id);
}
