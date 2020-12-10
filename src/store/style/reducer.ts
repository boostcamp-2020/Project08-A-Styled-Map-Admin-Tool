import getReducer from './getReducer';

const INDEX = {
  POI: 0,
  ROAD: 1,
  ADMINISTRATIVE: 2,
  LANDSCAPE: 3,
  TRANSIT: 4,
  WATER: 5,
};

export const poiReducer = getReducer(INDEX.POI);

export const roadReducer = getReducer(INDEX.ROAD);

export const administrativeReducer = getReducer(INDEX.ADMINISTRATIVE);

export const landscapeReducer = getReducer(INDEX.LANDSCAPE);

export const transitReducer = getReducer(INDEX.TRANSIT);

export const waterReducer = getReducer(INDEX.WATER);
