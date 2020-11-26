import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import water from './style/waterReducer';
import marker from './style/markerReducer';

const rootReducer = combineReducers({ map, poi, water, marker });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
