export default [
  {
    type: 'fill',
    source: 'composite',
    'source-layer': 'landuse',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': 'hsl(230, 100%, 44%)',
    },
    filter: ['in', 'class', 'airport'],
    id: 'transit-airport',
  },
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
    filter: ['in', 'type', 'subway'],
    id: 'transit-subway',
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
    filter: ['in', 'type', 'rail'],
    id: 'transit-rail',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 12,
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'green',
      'text-halo-width': 0.5,
      'text-color': 'red',
    },
    filter: ['in', 'type', 'bus_stop'],
    id: 'transit-bus-label',
  },
];
