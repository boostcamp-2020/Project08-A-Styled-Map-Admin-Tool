import { combineReducers, createStore } from 'redux';
import map from './map/reducer';

const rootReducer = combineReducers({ map });
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
