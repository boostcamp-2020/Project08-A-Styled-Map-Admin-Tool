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
import history from './history/reducer';
import depthTheme from './depth-theme/reducer';

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
  history,
  depthTheme,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
