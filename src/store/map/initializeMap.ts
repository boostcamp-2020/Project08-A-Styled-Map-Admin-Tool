import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dotenv from 'dotenv';

const LNG = 128;
const LAT = 36.5;
const ZOOM = 7;
const LABELS = [
  'country-label',
  'settlement-label',
  'road-label',
  'state-label',
  'settlement-subdivision-label',
  'airport-label',
  'transit-label',
  'water-point-label',
  'water-line-label',
  'waterway-label',
  'natural-point-label',
  'natural-line-label',
];

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

interface InitializeMapProps {
  mapRef: RefObject<HTMLDivElement>;
}

function translate(map: mapboxgl.Map) {
  LABELS.forEach((label) => {
    map.setLayoutProperty(label, 'text-field', ['get', 'name_ko']);
  });
}

function initializeMap({ mapRef }: InitializeMapProps): mapboxgl.Map {
  const map = new mapboxgl.Map({
    container: mapRef.current as HTMLDivElement,
    style: 'mapbox://styles/mapbox/streets-v11',
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
    translate(map);
  });

  return map;
}

export default initializeMap;
