import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  FeatureType,
} from '../../store/common/type';

interface UseDetailTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
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
  featureName,
  subFeatureName,
  sidebarTypeName,
  sidebarSubTypeName,
  sidebarTypeClickHandler,
  sidebarSubTypeClickHandler,
}: UseDetailTypeProps): UseDetailHookType {
  const detail = useSelector<RootState>((state) => {
    if (!featureName) {
      return dummyDetail;
    }

    return state[featureName][subFeatureName];
  }) as FeatureType;

  const styleClickHandler = (
    elementName: ElementNameType,
    subElementName?: SubElementNameType
  ) => {
    sidebarTypeClickHandler(elementName);
    if (subElementName) sidebarSubTypeClickHandler(subElementName);
  };

  const checkIsSelected = (
    elementName: ElementNameType,
    subElementName?: SubElementNameType
  ) => {
    if (!subElementName) return sidebarTypeName === elementName;
    return (
      sidebarTypeName === elementName && sidebarSubTypeName === subElementName
    );
  };

  return {
    detail,
    styleClickHandler,
    checkIsSelected,
  };
}

export default useDetailType;
