import { stylingProps } from '.';
import { ColorType } from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import seperatedLayers from './macgyver/seperatedLayers';
import {
  getIdsFromLayersArr,
  getIdsFromLayersArrWithType,
  getIdsFromLayersArrWithoutType,
} from './macgyver/utils';
import weightTemplate from './macgyver/weightTemplate';
import { roadMappingToFunc } from './macgyver/mappingDetailToFunc';

function roadStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (key === 'isChanged') return;
  let type = null;
  let func = null;

  if (element === ElementNameType.labelIcon) {
    if (key !== 'visibility') return;
    const { typeName, funcName } = roadMappingToFunc[element][key];
    type = typeName;
    func = funcName;
  } else {
    const { typeName, funcName } = roadMappingToFunc[element][subElement][key];
    type = typeName;
    func = funcName;
  }

  /** get LayerNames */
  if (!type || !func) return;
  let layerNames: string[] = [];
  let outsideLayerNames: string[] = [];
  if (
    element === ElementNameType.labelText ||
    element === ElementNameType.labelIcon
  ) {
    layerNames = getIdsFromLayersArr(seperatedLayers.road[subFeature][element]);
  } else {
    layerNames = getIdsFromLayersArrWithoutType(
      seperatedLayers.road[subFeature][element][subElement],
      SubElementNameType.fill
    );
    outsideLayerNames = getIdsFromLayersArrWithType(
      seperatedLayers.road[subFeature][element][subElement],
      SubElementNameType.fill
    );
  }

  /** set weight with weightTemplate */
  let zoomWeight = null;
  if (key === StyleKeyType.weight) {
    zoomWeight = weightTemplate[subFeature][subElement](style.weight);
  }

  /** styling */
  // fill일 때만 조건문 추가
  if (outsideLayerNames.length && key !== StyleKeyType.weight) {
    func({
      map,
      layerNames: outsideLayerNames,
      type: ColorType.fill,
      color: style.color,
      [key]: style[key as StyleKeyType],
    });
  }

  func({
    map,
    layerNames,
    type,
    color: style.color,
    [key]: zoomWeight || style[key as StyleKeyType],
  });
}

export default roadStyling;
