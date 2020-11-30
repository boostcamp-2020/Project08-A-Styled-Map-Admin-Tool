export default [
  {
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'yellow',
    },
    filter: ['==', ['get', 'type'], 'subway'],
    id: 'transit-subway',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-color': 'green',
    },
    filter: ['==', ['get', 'type'], 'taxi'],
    id: 'transit-bus',
  },
  {
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'black',
    },
    filter: ['==', ['get', 'type'], 'rail'],
    id: 'transit-rail',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-color': 'pink',
    },
    filter: ['match', ['get', 'type'], ['taxi'], true, false],
    id: 'transit-bus',
  },
];
