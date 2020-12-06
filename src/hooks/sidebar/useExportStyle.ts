import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import mapboxgl from 'mapbox-gl';
import { FeatureNameType } from '../../store/common/type';

interface StoreDataType {
  [key: string]: FeatureNameType | mapboxgl.Map | undefined;
}

interface UseExportStyleType {
  exportStyle: () => string;
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

// function filterSubElement() {}

function filterElement(element: ElementType): ElementType {
  if (!element.isChanged) {
    return {};
  }

  // Object.entries(element).reduce();
  return element;
}

function filterSubFeature(subFeature: SubFeatureType) {
  const ret = Object.entries(subFeature).reduce((accu, [key, element]) => {
    if (key === 'all') {
      return accu;
    }
    const filteredValue = filterElement(element as ElementType);

    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: element };
  }, {});

  return ret;
}

function filterStyleJSON(style: StoreDataType): string {
  const ret = Object.entries(style).reduce((accu, [key, subFeature]) => {
    const filteredValue = filterSubFeature(subFeature as SubFeatureType);
    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: filteredValue };
  }, {});

  return JSON.stringify(ret, null, 2);
}

function useExportStyle(): UseExportStyleType {
  const data: StoreDataType = useSelector<RootState>(
    (state) => state
  ) as StoreDataType;

  const exportStyle = (): string => {
    if ('map' in data) {
      const { map, sidebar, ...style } = data;
      const stringifiedStyle = filterStyleJSON(style);
      return stringifiedStyle;
    }

    return '';
  };

  return { exportStyle };
}

export default useExportStyle;
