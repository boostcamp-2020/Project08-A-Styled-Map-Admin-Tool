import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dotenv from 'dotenv';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import initLayers from '../../utils/rendering-data/layers/init';

const LNG = 126.978;
const LAT = 37.5656;
const ZOOM = 15.5;

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

interface InitializeMapProps {
  mapRef: RefObject<HTMLDivElement>;
  initializeMap: (map: mapboxgl.Map) => void;
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

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: '검색할 장소를 입력하세요',
  });

  document.getElementById('search-bar')?.appendChild(geocoder.onAdd(map));

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
    initializeMap(map);
  });

  return map;
}

export default initializeMap;
