import { combineReducers, createStore } from 'redux';

import map from './map/reducer';
import {
  poiReducer as poi,
  transitReducer as transit,
  landscapeReducer as landscape,
  administrativeReducer as administrative,
  roadReducer as road,
  waterReducer as water,
  markerReducer as marker,
} from './style/reducer';
import sidebar from './sidebar/reducer';

const rootReducer = combineReducers({
  map,
  poi,
  landscape,
  administrative,
  road,
  transit,
  water,
  marker,
  sidebar,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
