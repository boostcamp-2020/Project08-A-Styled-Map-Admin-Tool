import { combineReducers, createStore } from 'redux';

import map from './map/reducer';
import poi from './style/poiReducer';
import transit from './style/transitReducer';
import water from './style/waterReducer';
import marker from './style/markerReducer';
import road from './style/roadReducer';
import landscape from './style/landscapeReducer';
import administrative from './style/administrativeReducer';

const rootReducer = combineReducers({
  map,
  poi,
  landscape,
  administrative,
  road,
  transit,
  water,
  marker,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
