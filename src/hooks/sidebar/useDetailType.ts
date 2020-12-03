import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  FeatureType,
} from '../../store/common/type';

interface UseDetailTypeProps {
  feature: FeatureNameType;
  subFeature: string;
  sidebarTypeName: string;
  sidebarSubTypeName: string;
  sidebarTypeClickHandler: (name: string) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
}

export interface UseDetailHookType {
  detail: FeatureType;
  styleClickHandler: (
    elementName: ElementNameType,
    subElementName?: SubElementNameType
  ) => void;
  checkIsSelected: (
    elementName: ElementNameType,
    subElementName?: SubElementNameType
  ) => boolean;
}

const dummyDetail = {
  section: null,
  label: null,
};

function useDetailType({
  feature,
  subFeature,
  sidebarTypeName,
  sidebarSubTypeName,
  sidebarTypeClickHandler,
  sidebarSubTypeClickHandler,
}: UseDetailTypeProps): UseDetailHookType {
  const detail = useSelector<RootState>((state) => {
    if (!feature) {
      return dummyDetail;
    }

    return state[feature][subFeature];
  }) as FeatureType;

  const styleClickHandler = (
    element: ElementNameType,
    subElement?: SubElementNameType
  ) => {
    sidebarTypeClickHandler(element);
    if (subElement) sidebarSubTypeClickHandler(subElement);
  };

  const checkIsSelected = (
    element: ElementNameType,
    subElement?: SubElementNameType
  ) => {
    if (!subElement) return sidebarTypeName === element;
    return sidebarTypeName === element && sidebarSubTypeName === subElement;
  };

  return {
    detail,
    styleClickHandler,
    checkIsSelected,
  };
}

export default useDetailType;
