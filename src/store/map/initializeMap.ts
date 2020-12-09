import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dotenv from 'dotenv';

import initLayers from '../../utils/rendering-data/layers/init';

const LNG = 126.978;
const LAT = 37.5656;
const ZOOM = 15.5;

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

interface InitializeMapProps {
  mapRef: RefObject<HTMLDivElement>;
  initializeMap: () => void;
}

function initializeMap({
  mapRef,
  initializeMap,
}: InitializeMapProps): mapboxgl.Map {
  const map = new mapboxgl.Map({
    container: mapRef.current as HTMLDivElement,
    style: initLayers as mapboxgl.Style,
    center: [LNG, LAT],
    zoom: ZOOM,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
    'bottom-right'
  );

  map.on('load', () => {
    initializeMap();
  });

  return map;
}

export default initializeMap;
