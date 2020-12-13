import { ExportType, StoreDataType } from '../hooks/sidebar/useExportStyle';
import {
  /** JSONURL */
  URLJsonType,
  URLJsonSubElementType,
  URLJsonStyleType,
  URLJsonElementType,
  URLJsonSubFeatureType,
  /** property */
  FeatureNameType,
  SubFeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
  /** export */
  LocationType,
  LocationTypeName,
  URLJsonFeatureType,
} from '../store/common/type';
import { MarkerType } from '../store/marker/action';

enum QueryParameterTypes {
  location = 'location',
  markers = 'markers',
  style = 'style',
}

function jsonToURLGetStyleQueryString(
  json:
    | URLJsonType
    | URLJsonSubElementType
    | URLJsonStyleType
    | URLJsonElementType
    | URLJsonSubFeatureType
): string {
  return Object.entries(json).reduce((queryString: string, property) => {
    const [key, value] = property;
    if (typeof value === 'object') {
      return `${queryString}${key}:${jsonToURLGetStyleQueryString(value)}`;
    }
    return `${queryString}${key}:${value}:`;
  }, '');
}

function jsonToURLGetStyleLocationString(location: LocationType): string {
  return Object.entries(location).reduce(
    (queryString: string, [key, value]) => {
      return `${queryString}${key}:${value}:`;
    },
    ''
  );
}

function jsonToURLGetMarkersString(markers: MarkerType[]): string {
  const markersArrayToString = markers
    .map(({ lng, lat, text }) => `${lng}:${lat}:${text}`)
    .join('-');
  return markersArrayToString;
}

function isNotEmptyObject(object?: StoreDataType | MarkerType[]): boolean {
  return object !== undefined && Object.keys(object).length > 0;
}

export function jsonToURL({
  filteredStyle,
  mapCoordinate,
  markers,
}: ExportType): string {
  const url = 'http://map-styler.kro.kr/show?';
  const styleQueryString = isNotEmptyObject(filteredStyle)
    ? `style=${encodeURIComponent(
        jsonToURLGetStyleQueryString(filteredStyle as URLJsonType)
      )}&`
    : '';
  const locationQueryString = `location=${encodeURIComponent(
    jsonToURLGetStyleLocationString(mapCoordinate as LocationType)
  )}&`;
  const markerQueryString = isNotEmptyObject(markers)
    ? `markers=${encodeURIComponent(
        jsonToURLGetMarkersString(markers as MarkerType[])
      )}`
    : ``;

  return url + locationQueryString + styleQueryString + markerQueryString;
}

function urlToJsonGetStyleJson(styleParams: string): URLJsonFeatureType | null {
  if (!styleParams) return null;

  const values = styleParams?.split(':');
  const state: any = {};
  const properties = {
    feature: '',
    subFeature: '',
    element: '',
    subElement: '',
  };

  values?.forEach((value, index) => {
    const { feature, subFeature, element, subElement } = properties;
    if (value in FeatureNameType) {
      state[value] = {};
      properties.feature = value;
    } else if (value in SubFeatureNameType) {
      state[feature][value] = {};
      properties.subFeature = value;
    } else if (value in ElementNameType) {
      state[feature][subFeature][value] = {};
      properties.element = value;
    } else if (value in SubElementNameType) {
      state[feature][subFeature][element][value] = {};
      properties.subElement = value;
    } else if (value in StyleKeyType) {
      if (element === ElementNameType.labelIcon) {
        state[feature][subFeature][element][value] = values[index + 1];
        return;
      }
      state[feature][subFeature][element][subElement][value] =
        values[index + 1];
    }
  });
  return state as URLJsonFeatureType;
}

function urlToJsonGetLocationJson(locationParams: string): LocationType | null {
  if (!locationParams) return null;

  const locationKeyReg = /(zoom|lng|lat):[\d.]+/g;
  const values = locationParams
    .match(locationKeyReg)
    ?.map((location) => location.split(':'));

  const state: LocationType = {};
  values?.forEach(([key, value]) => {
    state[key as LocationTypeName] = +value;
  });

  return state;
}

function urlToJsonGetMarkerJson(markersParams: string): MarkerType[] | null {
  if (!markersParams) return null;

  const markerArray = markersParams
    .split('-')
    .map((marker) => marker.split(':'))
    .map(([lng, lat, text]) => ({
      lng: +lng,
      lat: +lat,
      text,
    }));

  return markerArray;
}

function parseQueryString(query: string) {
  const params = query.slice(1).split('&');
  const findParam = (key: QueryParameterTypes) =>
    params.find((param) => param.startsWith(key))?.replace(`${key}=`, '');

  const location = findParam(QueryParameterTypes.location) ?? '';
  const markers = findParam(QueryParameterTypes.markers) ?? '';
  const style = findParam(QueryParameterTypes.style) ?? '';

  return { location, markers, style };
}

export function urlToJson(): URLJsonType {
  const queryString = decodeURIComponent(window.location.search);
  const { location, markers, style } = parseQueryString(queryString);
  const statesFromUrl = {
    filteredStyle: urlToJsonGetStyleJson(style) as URLJsonSubFeatureType,
    mapCoordinate: urlToJsonGetLocationJson(location),
    markers: urlToJsonGetMarkerJson(markers),
  };

  return statesFromUrl;
}
