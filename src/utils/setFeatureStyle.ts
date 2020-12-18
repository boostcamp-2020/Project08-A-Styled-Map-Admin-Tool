import mapboxgl from 'mapbox-gl';
import {
  FeatureState,
  ActionPayload,
  SubElementType,
  StyleType,
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
} from '../store/common/type';
import * as mapStyling from './map-styling';

interface setWholeStyleProps {
  map: mapboxgl.Map;
  feature: FeatureNameType;
  featureState: FeatureState;
}

/* eslint-disable no-restricted-syntax */
function setFeatureStyle({
  map,
  feature,
  featureState,
}: setWholeStyleProps): void {
  const subFeatures = Object.keys(featureState);
  const sortedFeatures = subFeatures.sort((x, y) => {
    if (featureState[x].isChanged || !featureState[y].isChanged) return 1;
    return -1;
  });
  const isInit =
    subFeatures.findIndex(
      (subFeature) => featureState[subFeature].isChanged
    ) === -1;

  for (const subFeature of sortedFeatures) {
    const elements = Object.keys(featureState[subFeature]) as ElementNameType[];
    for (const element of elements) {
      const elementStyle = featureState[subFeature][element];
      if (elementStyle) {
        switch (element) {
          case ElementNameType.labelIcon:
            setElementStyle({
              map,
              feature,
              subFeature,
              element,
              style: elementStyle as StyleType,
              isInit,
            });
            break;
          case ElementNameType.labelText:
          case ElementNameType.section:
            (Object.keys(
              elementStyle as SubElementType
            ) as SubElementNameType[]).forEach((subElement) => {
              setElementStyle({
                map,
                feature,
                subFeature,
                element,
                subElement,
                style: (elementStyle as SubElementType)[
                  subElement
                ] as StyleType,
                isInit,
              });
            });
            break;
          default:
            break;
        }
      }
    }
  }
}

interface setElementStyleProps extends ActionPayload {
  map: mapboxgl.Map;
  isInit: boolean;
}

function setElementStyle({
  map,
  feature,
  subFeature,
  element,
  subElement,
  style,
  isInit,
}: setElementStyleProps): void {
  if (!style.isChanged && !isInit) return;
  const keys = Object.keys(style) as StyleKeyType[];
  keys.forEach((key) => {
    if (key === 'color' && style[key] === 'transparent') {
      return;
    }
    mapStyling[feature]({
      map,
      subFeature,
      key,
      element,
      subElement: subElement as SubElementNameType,
      style,
    });
  });
}

export default setFeatureStyle;
