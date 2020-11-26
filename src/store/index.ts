import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';
import landscape from './style/landscapeReducer';

const rootReducer = combineReducers({ map, poi, landscape });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
