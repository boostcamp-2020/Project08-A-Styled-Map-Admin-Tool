import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dotenv from 'dotenv';

import poiLayers from '../../utils/rendering-data/layers/poi';
import roadLayers from '../../utils/rendering-data/layers/road';
import transitLayers from '../../utils/rendering-data/layers/transit';
import initLayersColor from '../../utils/rendering-data/initLayerColor';

const LNG = 126.978;
const LAT = 37.5656;
const ZOOM = 15.5;
const LABEL_LAYERS: string[] = [
  'country-label',
  'settlement-label',
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
  initializeMap: () => void;
}

function translate(map: mapboxgl.Map) {
  LABEL_LAYERS.forEach((label) => {
    map.setLayoutProperty(label, 'text-field', ['get', 'name_ko']);
  });
}

function initializeMap({
  mapRef,
  initializeMap,
}: InitializeMapProps): mapboxgl.Map {
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
    const removalLayers: string[] = ['poi-label', 'road-label', 'road-polygon'];
    removalLayers.forEach((element) => {
      map.removeLayer(element);
    });

    const layers = [
      ...roadLayers,
      ...transitLayers,
      ...poiLayers,
    ] as mapboxgl.Layer[];
    layers.forEach((layer: mapboxgl.Layer) => map.addLayer(layer));

    Object.entries(initLayersColor).forEach(([key, value]) => {
      map.setPaintProperty(key, `${value.type}-color`, value.color);
    });

    initializeMap();
  });

  return map;
}

export default initializeMap;
