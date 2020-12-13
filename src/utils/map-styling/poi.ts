/* eslint-disable consistent-return */
import { stylingProps } from './index';
import { WeightType, ColorType, StyleTypes } from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  PoiNameType,
} from '../../store/common/type';
import seperatedLayers from './macgyver/seperatedLayers';
import { getIdsFromLayersArr, INVISIBLE, VISIBLE } from './macgyver/utils';
import { poiMappingToFunc } from './macgyver/mappingDetailToFunc';

function poiStyling({
  map,
  subFeature,
  element,
  subElement,
  style,
  key,
}: stylingProps): void {
  let type = null;
  let func = null;

  if (element === ElementNameType.section) return;
  if (element === ElementNameType.labelText && key !== 'isChanged') {
    const { typeName, funcName } = poiMappingToFunc[element][subElement][key];
    type = typeName;
    func = funcName;
  } else if (element === ElementNameType.labelIcon && key === 'visibility') {
    const { typeName, funcName } = poiMappingToFunc[element][key];
    type = typeName;
    func = funcName;
  }

  /** get LayerNames */
  if (!type || !func) return;
  const layerNames = getIdsFromLayersArr(
    seperatedLayers.poi[subFeature as PoiNameType].labelText
  );

  /** styling */
  if (
    key === 'visibility' &&
    (type === ColorType.icon || type === WeightType.textHalo)
  ) {
    func({
      map,
      layerNames,
      type,
      weight: style.visibility === 'none' ? INVISIBLE : VISIBLE,
    });
    return;
  }

  func({
    map,
    layerNames,
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default poiStyling;
