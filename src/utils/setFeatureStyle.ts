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
  for (const subFeature of subFeatures) {
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
}

function setElementStyle({
  map,
  feature,
  subFeature,
  element,
  subElement,
  style,
}: setElementStyleProps): void {
  const keys = Object.keys(style) as StyleKeyType[];
  keys.forEach((key) => {
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
