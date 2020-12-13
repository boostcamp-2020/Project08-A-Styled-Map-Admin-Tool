import { stylingProps } from './index';
import { WeightType, ColorType, VisibilityType } from '../applyStyle';
import { StyleKeyType, ElementNameType } from '../../store/common/type';
import seperatedLayers from './macgyver/seperatedLayers';
import {
  getIdsFromLayersArr,
  getIdsFromLayersArrWithType,
  getIdsFromLayersArrWithoutType,
  INVISIBLE,
  VISIBLE,
} from './macgyver/utils';
import { landscapeMappingToFunc } from './macgyver/mappingDetailToFunc';

const BACKGROUND_TYPE = 'background';

function landscapeStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (key === 'isChanged' || element === ElementNameType.labelIcon) return;

  const { typeName: type, funcName: func } = landscapeMappingToFunc[element][
    subElement
  ][key];
  if (!type || !func) return;

  /** get LayerNames */
  let layerNames: string[] = [];
  let outsideLayerNames: string[] = [];
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.landscape[subFeature].labelText
    );
  } else {
    layerNames = getIdsFromLayersArrWithoutType(
      seperatedLayers.landscape[subFeature][element][subElement],
      BACKGROUND_TYPE
    );
    outsideLayerNames = getIdsFromLayersArrWithType(
      seperatedLayers.landscape[subFeature][element][subElement],
      BACKGROUND_TYPE
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

  if (outsideLayerNames.length) {
    func({
      map,
      layerNames: outsideLayerNames,
      type: ColorType.background,
      color: style.color,
      [key]: style[key as StyleKeyType],
    });
  }

  func({
    map,
    layerNames,
    type,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default landscapeStyling;
