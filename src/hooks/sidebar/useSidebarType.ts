import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setFeature,
  setSubFeature,
  setElement,
  setSubElement,
} from '../../store/sidebar/action';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';

export interface SidebarHookType {
  sidebarTypeClickHandler: (name: string) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
  sidebarTypeName: string;
  sidebarSubTypeName: string;
}

function useSidebarType(): SidebarHookType {
  const [sidebarTypeName, setSidebarTypeName] = useState<string>('');
  const [sidebarSubTypeName, setSidebarSubTypeName] = useState<string>('');
  const dispatch = useDispatch();

  const sidebarTypeClickHandler = (name: string) => {
    if (name !== sidebarTypeName) {
      if (
        name === ElementNameType.section ||
        name === ElementNameType.labelText ||
        name === ElementNameType.labelIcon
      ) {
        dispatch(setElement(name as ElementNameType));
      } else {
        dispatch(setFeature(name as FeatureNameType));
      }
      setSidebarTypeName(name);
    }
  };

  const sidebarSubTypeClickHandler = (name: string) => {
    if (name !== sidebarSubTypeName) {
      if (
        name === SubElementNameType.fill ||
        name === SubElementNameType.stroke
      ) {
        dispatch(setSubElement(name));
      } else {
        dispatch(setSubFeature(name));
      }
      setSidebarSubTypeName(name);
    }
  };

  return {
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
    sidebarTypeName,
    sidebarSubTypeName,
  };
}

export default useSidebarType;
