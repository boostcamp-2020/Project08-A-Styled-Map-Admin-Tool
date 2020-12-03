import { useDispatch, useSelector } from 'react-redux';
import {
  setSidebarProperties,
  initSidebarProperties,
} from '../../store/sidebar/action';
import { RootState } from '../../store/index';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  PayloadPropsType,
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
  ) as PayloadPropsType;
  const { feature, subFeature, element, subElement } = sidebarStates;

  const sidebarTypeClickHandler = (name: FeatureNameType | ElementNameType) => {
    if ([feature, element].includes(name)) return;
    if (Object.keys(ElementNameType).includes(name)) {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          element: name as ElementNameType,
          key: 'element',
        })
      );
    } else {
      dispatch(
        initSidebarProperties({
          ...sidebarStates,
          feature: name as FeatureNameType,
          key: 'feature',
        })
      );
    }
  };

  const sidebarSubTypeClickHandler = (name: string) => {
    if ([subFeature, subElement].includes(name)) return;
    if (Object.keys(SubElementNameType).includes(name)) {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          subElement: name as SubElementNameType,
          key: 'subElement',
        })
      );
    } else {
      dispatch(
        setSidebarProperties({
          ...sidebarStates,
          subFeature: name,
          key: 'subFeature',
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
