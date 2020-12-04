import { PayloadPropsType, SidebarActionType } from '../common/type';
import { SET_SIDEBAR_PROPERTIES, INIT_SIDEBAR_PROPERTIES } from './action';

const initialState: PayloadPropsType = {
  key: 'feature',
  feature: null,
  subFeature: null,
  element: null,
  subElement: null,
};

function sidebarReducer(
  state: PayloadPropsType = initialState,
  action: SidebarActionType
): PayloadPropsType {
  switch (action.type) {
    case SET_SIDEBAR_PROPERTIES: {
      return {
        ...state,
        [action.payload.key]: action.payload[action.payload.key],
      };
    }
    case INIT_SIDEBAR_PROPERTIES: {
      return {
        ...initialState,
        [action.payload.key]: action.payload[action.payload.key],
      };
    }
    default:
      return state;
  }
}

export default sidebarReducer;
