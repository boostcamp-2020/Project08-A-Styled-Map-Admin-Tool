import { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dotenv from 'dotenv';

import road from './layers/road';
import transit from './layers/transit';
import poi from './layers/poi';
import landscape from './layers/landscape';
import water from './layers/water';
import mapboxPOI from './layers/mapbox-poi';

import initColor from '../../utils/rendering-data/layerColor3';

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

enum Sources {
  polygon = 'polygon_source',
  line = 'line_source',
  poi = 'poi_source',
}

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

interface InitializeMapProps {
  mapRef: RefObject<HTMLDivElement>;
}

function translate(map: mapboxgl.Map) {
  LABEL_LAYERS.forEach((label) => {
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
    map.removeLayer('poi-label');
    map.removeLayer('road-label');
    map.removeLayer('road-polygon');

    map.addSource(Sources.polygon, {
      type: 'vector',
      tiles: ['http://110.93.147.18:8080/boostcamp/polygon/{x}/{y}/{z}'],
    });
    map.addSource(Sources.line, {
      type: 'vector',
      tiles: ['http://110.93.147.18:8080/boostcamp/line/{x}/{y}/{z}'],
    });
    map.addSource(Sources.poi, {
      type: 'vector',
      tiles: ['http:/110.93.147.18:8080/boostcamp/poi/{x}/{y}/{z}'],
    });

    const layers = [
      ...road,
      ...landscape,
      ...transit,
      ...water,
      ...mapboxPOI,
      ...poi,
    ] as mapboxgl.Layer[];
    layers.forEach((layer: mapboxgl.Layer) => map.addLayer(layer));

    Object.entries(initColor).forEach(([key, value]) => {
      map.setPaintProperty(key, `${value.type}-color`, value.color);
    });
  });

  return map;
}

export default initializeMap;
