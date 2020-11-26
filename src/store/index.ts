import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import transit from './style/transitReducer';

const rootReducer = combineReducers({ map, poi, transit });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
