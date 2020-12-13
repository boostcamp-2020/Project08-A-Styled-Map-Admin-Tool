import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import mapboxgl from 'mapbox-gl';
import {
  ElementNameType,
  ElementPropsType,
  FeatureNameType,
  StyleKeyType,
  SubElementNameType,
  LocationType,
} from '../../store/common/type';
import { getDefaultStyle } from '../../store/style/properties';
import { MarkerInstanceType, MarkerType } from '../../store/marker/action';
import { jsonToURL } from '../../utils/urlParsing';

export interface StoreDataType {
  [key: string]: FeatureNameType | undefined;
}

export interface ExportStyleMarkersType {
  filteredStyle?: StoreDataType;
  markers?: MarkerType[];
}

export interface ExportType extends ExportStyleMarkersType {
  mapCoordinate?: LocationType;
}

interface UseExportStyleType {
  exportStyle: () => ExportType;
}

interface StyleType {
  isChanged?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}

interface SubElementType {
  isChanged?: boolean;
  fill?: StyleType;
  stroke?: StyleType;
}

interface SubFeatureType {
  all?: boolean;
}

interface ElementType {
  isChanged?: boolean;
  section?: SubElementType | null;
  labelText?: SubElementType | null;
  labelIcon?: StyleType | null;
}

export const getStringifyStyleObject = ({
  filteredStyle,
  markers,
}: ExportType): string => {
  const storedMarkers = markers ?? [];
  const data =
    storedMarkers.length > 0
      ? { ...filteredStyle, markers }
      : { ...filteredStyle };
  const stringifyStyleMarkers = JSON.stringify(data, null, 2);
  return stringifyStyleMarkers;
};

export const geturlParsedStyle = (style: ExportType): string => {
  return jsonToURL(style);
};

function compareChange(
  defaultStyle: StyleType,
  newStyle: StyleType
): StyleType {
  const ret = Object.keys(defaultStyle).reduce((accu, key) => {
    if (key === StyleKeyType.isChanged) {
      return accu;
    }

    if (defaultStyle[key as StyleKeyType] === newStyle[key as StyleKeyType]) {
      return accu;
    }

    return { ...accu, [key]: newStyle[key as StyleKeyType] };
  }, {});

  return ret;
}

function filterSubElement(
  currentLocation: ElementPropsType,
  subElement: SubElementType
): SubElementType {
  if (subElement.isChanged) {
    return compareChange(getDefaultStyle(currentLocation), subElement);
  }

  const ret = Object.entries(subElement).reduce((accu, [key, styleKey]) => {
    if (!styleKey.isChanged) {
      return accu;
    }

    return styleKey.isChanged
      ? {
          ...accu,
          [key]: compareChange(
            getDefaultStyle({
              ...currentLocation,
              subElement: key as SubElementNameType,
            }),
            styleKey
          ),
        }
      : accu;
  }, {});
  return ret;
}

function filterElement(
  currentLocation: ElementPropsType,
  element: ElementType
): ElementType {
  if (!element.isChanged) {
    return {};
  }

  const { isChanged, ...changedElement } = element;

  const ret = Object.entries(changedElement).reduce(
    (accu, [key, subElement]) => {
      if (subElement === null) {
        return accu;
      }
      const filteredValue = filterSubElement(
        { ...currentLocation, element: key as ElementNameType },
        subElement
      );

      return Object.keys(filteredValue).length === 0
        ? accu
        : { ...accu, [key]: filteredValue };
    },
    {}
  );
  return ret;
}

function filterSubFeature(
  currentLocation: ElementPropsType,
  subFeature: SubFeatureType
) {
  const ret = Object.entries(subFeature).reduce((accu, [key, element]) => {
    const filteredValue = filterElement(
      { ...currentLocation, subFeature: key },
      element as ElementType
    );

    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: filteredValue };
  }, {});

  return ret;
}

function filterStyle(style: StoreDataType): StoreDataType {
  const ret = Object.entries(style).reduce((accu, [key, subFeature]) => {
    const currentLocation: ElementPropsType = {
      feature: key as FeatureNameType,
      subFeature: '',
      element: 'section' as ElementNameType,
      subElement: undefined,
    };
    const filteredValue = filterSubFeature(
      currentLocation,
      subFeature as SubFeatureType
    );
    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: filteredValue };
  }, {});

  return ret;
}

function getMapCoordinate(map: mapboxgl.Map) {
  return {
    zoom: map.getZoom(),
    lng: map.getCenter().lng,
    lat: map.getCenter().lat,
  };
}

function getExportMarkersArray(markers: MarkerInstanceType[]): MarkerType[] {
  const exportMarkersArray = markers.map(({ lng, lat, text }) => ({
    lng,
    lat,
    text,
  }));

  return exportMarkersArray;
}

function useExportStyle(): UseExportStyleType {
  const { map, sidebar, history, depthTheme, marker, ...style } = useSelector<
    RootState
  >((state) => state) as any;

  const exportStyle = (): ExportType => {
    if (map || history || marker) {
      const markers = getExportMarkersArray(marker.markers);
      const filteredStyle = filterStyle(style);
      const mapCoordinate = getMapCoordinate(map.map);

      return {
        filteredStyle,
        mapCoordinate,
        markers,
      };
    }

    return {};
  };

  return { exportStyle };
}

export default useExportStyle;
