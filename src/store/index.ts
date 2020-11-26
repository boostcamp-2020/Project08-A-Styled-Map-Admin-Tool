import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import road from './style/roadReducer';

const rootReducer = combineReducers({ map, poi, road });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
