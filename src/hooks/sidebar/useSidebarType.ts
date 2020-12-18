// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setSidebarProperties,
  initSidebarProperties,
} from '../../store/sidebar/action';
import { RootState } from '../../store/index';

// Type
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  SidebarState,
  SidebarProperties,
} from '../../store/common/type';

export interface SidebarHookType {
  sidebarTypeClickHandler: (name: FeatureNameType | ElementNameType) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
  feature: FeatureNameType | null;
  subFeature: string | null;
  element: ElementNameType | null;
  subElement: SubElementNameType | null;
}

function useSidebarType(): SidebarHookType {
  const dispatch = useDispatch();
  const sidebarStates = useSelector<RootState>(
    (state) => state.sidebar
  ) as SidebarState;
  const { feature, subFeature, element, subElement } = sidebarStates;

  const sidebarTypeClickHandler = (name: FeatureNameType | ElementNameType) => {
    if ([feature, element].includes(name)) return;
    if (Object.keys(ElementNameType).includes(name)) {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          element: name as ElementNameType,
          key: SidebarProperties.element,
        })
      );
    } else {
      dispatch(
        initSidebarProperties({
          ...sidebarStates,
          feature: name as FeatureNameType,
          key: SidebarProperties.feature,
        })
      );
    }
  };

  const sidebarSubTypeClickHandler = (name: string) => {
    if (Object.keys(SubElementNameType).includes(name)) {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          subElement: name as SubElementNameType,
          key: SidebarProperties.subElement,
        })
      );
    } else {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          subFeature: name,
          key: SidebarProperties.subFeature,
        })
      );
    }
  };

  return {
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
    feature,
    subFeature,
    element,
    subElement,
  };
}

export default useSidebarType;
