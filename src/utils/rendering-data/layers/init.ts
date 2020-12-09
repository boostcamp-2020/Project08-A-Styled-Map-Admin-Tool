import landscape from './landscape';
import water from './water.json';
import road from './road.json';
import transit from './transit.json';
import poi from './poi.json';
import administrative from './administrative.json';

const initLayers = {
  version: 8,
  name: 'Mapbox Streets',
  metadata: {
    'mapbox:type': 'default',
    'mapbox:origin': 'streets-v11',
    'mapbox:autocomposite': true,
    'mapbox:groups': {
      '1444855786460.0557': { name: 'Roads', collapsed: true },
      '1444934295202.7542': { name: 'Admin boundaries', collapsed: true },
      '1444855799204.86': { name: 'Bridges', collapsed: true },
      '1444855769305.6016': { name: 'Tunnels', collapsed: true },
    },
  },
  sources: {
    composite: {
      url: 'mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2',
      type: 'vector',
    },
    polygon_source: {
      tiles: ['http://110.93.147.18:8080/boostcamp/polygon/{x}/{y}/{z}'],
      type: 'vector',
    },
    line_source: {
      tiles: ['http://110.93.147.18:8080/boostcamp/line/{x}/{y}/{z}'],
      type: 'vector',
    },
    poi_source: {
      tiles: ['http://110.93.147.18:8080/boostcamp/poi/{x}/{y}/{z}'],
      type: 'vector',
    },
  },
  center: [0, 0],
  zoom: 3,
  sprite: 'mapbox://sprites/mapbox/streets-v11',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  layers: [
    ...landscape,
    ...water.water,
    ...administrative.administrative,
    ...transit.transit,
    ...road.road,
    ...poi.poi,
  ],
};

export default initLayers;
