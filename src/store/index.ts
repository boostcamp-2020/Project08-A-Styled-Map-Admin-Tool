import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import road from './style/roadReducer';
import landscape from './style/landscapeReducer';
import administrative from './style/administrativeReducer';

const rootReducer = combineReducers({ map, poi, landscape, administrative, road });

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
