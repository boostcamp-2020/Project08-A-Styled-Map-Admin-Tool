/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';
import { StyleKeyType, ElementNameType } from '../../store/common/type';
import { WeightType } from '../../utils/applyStyle';
import seperatedLayers from './macgyver/seperatedLayers';
import { getIdsFromLayersArr, INVISIBLE, VISIBLE } from './macgyver/utils';
import { transitMappingToFunc } from './macgyver/mappingDetailToFunc';

function transitStyling({
  map,
  subFeature,
  key,
  element,
  subElement,
  style,
}: stylingProps): void {
  if (key === 'isChanged' || element === ElementNameType.labelIcon) return;

  const { typeName: type, funcName: func } = transitMappingToFunc[element][
    subElement
  ][key];
  if (!type || !func) return;

  /** get LayerNames */
  let layerNames: string[] = [];
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.transit[subFeature].labelText
    );
  } else {
    if (!seperatedLayers.transit[subFeature][element]) return;
    layerNames = getIdsFromLayersArr(
      seperatedLayers.transit[subFeature][element][subElement]
    );
  }

  /** styling */
  if (key === 'visibility' && type === WeightType.textHalo) {
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
    type,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default transitStyling;
