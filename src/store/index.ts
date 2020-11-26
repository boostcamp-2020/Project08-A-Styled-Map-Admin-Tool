import { combineReducers, createStore } from 'redux';
import map from './map/reducer';
import poi from './style/poiReducer';

const rootReducer = combineReducers({ map, poi });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
