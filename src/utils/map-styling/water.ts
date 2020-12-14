import { stylingProps } from '.';
import { ElementNameType, StyleKeyType } from '../../store/common/type';
import { VisibilityType, WeightType } from '../applyStyle';
import seperatedLayers from './macgyver/seperatedLayers';
import { getIdsFromLayersArr, INVISIBLE, VISIBLE } from './macgyver/utils';
import { waterMappingToFunc } from './macgyver/mappingDetailToFunc';

function waterStyling({
  map,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (key === 'isChanged' || element === ElementNameType.labelIcon) return;

  const { typeName: type, funcName: func } = waterMappingToFunc[element][
    subElement
  ][key];
  if (!type || !func) return;

  /** get LayerNames */
  let layerNames: string[] = [];
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(seperatedLayers.water.all.labelText);
  } else {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.water.all[element][subElement]
    );
  }

  /** styling */
  if (key === StyleKeyType.visibility && type === WeightType.textHalo) {
    func({
      map,
      layerNames,
      type,
      weight: style.visibility === VisibilityType.none ? INVISIBLE : VISIBLE,
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

export default waterStyling;
