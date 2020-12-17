import { ExportType, StoreDataType } from '../hooks/sidebar/useExportStyle';
import {
  /** JSONURL */
  URLJsonType,
  URLJsonFeatureType,
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
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/show?'
      : process.env.REACT_APP_DEPLOY_URL;
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

function stringToNumber(style: string): number | string {
  const result = Number(style);
  if (Number.isNaN(result)) return style;
  return result;
}

function urlToJsonGetStyleJson(styleParams: string): URLJsonFeatureType {
  if (!styleParams) return {};

  const values = styleParams?.split(':');
  const state: URLJsonFeatureType = {};
  type propertiesType = {
    feature: FeatureNameType | '';
    subFeature: string | '';
    element: ElementNameType | '';
    subElement: SubElementNameType | '';
  };
  const properties: propertiesType = {
    feature: '',
    subFeature: '',
    element: '',
    subElement: '',
  };

  values?.forEach((value, index) => {
    const { feature, subFeature, element, subElement } = properties;
    if (value in FeatureNameType) {
      state[value as FeatureNameType] = {};
      properties.feature = value as FeatureNameType;
    } else if (value in SubFeatureNameType && feature) {
      (state[feature] as URLJsonSubFeatureType)[value] = {};
      properties.subFeature = value;
    } else if (value in ElementNameType && feature) {
      (state[feature] as URLJsonSubFeatureType)[subFeature][
        value as ElementNameType
      ] = {};
      properties.element = value as ElementNameType;
    } else if (value in SubElementNameType && feature && element) {
      ((state[feature] as URLJsonSubFeatureType)[subFeature][
        element
      ] as URLJsonSubFeatureType)[value] = {};
      properties.subElement = value as SubElementNameType;
    } else if (value in StyleKeyType && feature && element && subElement) {
      if (element === ElementNameType.labelIcon) {
        (((state[feature] as URLJsonSubFeatureType)[subFeature][
          element
        ] as URLJsonSubFeatureType)[
          value as StyleKeyType
        ] as URLJsonStyleType) = stringToNumber(
          values[index + 1]
        ) as URLJsonStyleType;
        return;
      }
      ((((state[feature] as URLJsonSubFeatureType)[subFeature][
        element
      ] as URLJsonSubFeatureType)[subElement] as URLJsonStyleType)[
        value as StyleKeyType
      ] as URLJsonStyleType) = stringToNumber(
        values[index + 1]
      ) as URLJsonStyleType;
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
