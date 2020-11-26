import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import administrative from './style/administrativeReducer';

const rootReducer = combineReducers({ map, poi, administrative });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
