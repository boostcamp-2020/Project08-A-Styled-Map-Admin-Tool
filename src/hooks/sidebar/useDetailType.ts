import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  FeatureType,
  SidebarState,
} from '../../store/common/type';

interface UseDetailTypeProps {
  sidebarTypeClickHandler: (name: FeatureNameType | ElementNameType) => void;
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
  sidebarTypeClickHandler,
  sidebarSubTypeClickHandler,
}: UseDetailTypeProps): UseDetailHookType {
  const { feature, subFeature, element, subElement } = useSelector<RootState>(
    (state) => state.sidebar
  ) as SidebarState;

  const detail = useSelector<RootState>((state) => {
    if (!feature || !subFeature) {
      return dummyDetail;
    }

    return state[feature][subFeature];
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
    if (!subElementName) return elementName === element;
    return elementName === element && subElementName === subElement;
  };

  return {
    detail,
    styleClickHandler,
    checkIsSelected,
  };
}

export default useDetailType;
