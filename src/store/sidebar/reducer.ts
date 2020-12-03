import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  SidebarActionType,
} from '../common/type';
import {
  SET_FEATURE,
  SET_SUBFEATURE,
  SET_ELEMENT,
  SET_SUBELEMENT,
} from './action';

interface SidebarStateType {
  feature?: FeatureNameType | '';
  subFeature?: string;
  element?: ElementNameType | '';
  subElement?: SubElementNameType | '';
}

const initialState: SidebarStateType = {
  feature: '',
  subFeature: '',
  element: '',
  subElement: '',
};

function sidebarReducer(
  state: SidebarStateType = initialState,
  action: SidebarActionType
): SidebarStateType {
  switch (action.type) {
    case SET_FEATURE: {
      return {
        ...state,
        feature: action.payload.feature,
      };
    }
    case SET_SUBFEATURE: {
      return {
        ...state,
        subFeature: action.payload.subFeature,
      };
    }
    case SET_ELEMENT: {
      return {
        ...state,
        element: action.payload.element,
      };
    }
    case SET_SUBELEMENT: {
      return {
        ...state,

        subElement: action.payload.subElement,
      };
    }
    default:
      return state;
  }
}

export default sidebarReducer;
