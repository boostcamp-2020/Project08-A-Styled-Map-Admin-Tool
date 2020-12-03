export default [
  {
    id: 'mapbox-airport-polygon',
    type: 'fill',
    source: 'composite',
    'source-layer': 'landuse',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': 'hsl(234, 20%, 30%)',
    },
    filter: ['==', ['get', 'class'], 'airport'],
  },
  {
    id: 'mapbox-airport-aeroway-polygon',
    type: 'fill',
    metadata: {},
    source: 'composite',
    'source-layer': 'aeroway',
    minzoom: 11,
    filter: [
      'all',
      ['==', ['geometry-type'], 'Polygon'],
      ['match', ['get', 'type'], ['runway', 'taxiway', 'helipad'], true, false],
    ],
    layout: {},
    paint: {
      'fill-color': 'hsl(40, 97%, 64%)',
    },
  },
  {
    id: 'mapbox-airport-aeroway-line',
    type: 'line',
    metadata: {},
    source: 'composite',
    'source-layer': 'aeroway',
    minzoom: 9,
    filter: ['==', ['geometry-type'], 'LineString'],
    layout: {},
    paint: {
      'line-color': 'hsl(230, 23%, 82%)',
      'line-width': [
        'interpolate',
        ['exponential', 1.5],
        ['zoom'],
        9,
        ['match', ['get', 'type'], 'runway', 1, 'taxiway', 0.5, 0.5],
        18,
        ['match', ['get', 'type'], 'runway', 80, 'taxiway', 20, 20],
      ],
    },
  },
  {
    id: 'mapbox-airport-label',
    type: 'symbol',
    source: 'composite',
    'source-layer': 'airport_label',
    minzoom: 8,
    layout: {
      'text-size': 12,
      'icon-image': [
        'step',
        ['get', 'sizerank'],
        ['concat', ['get', 'maki'], '-15'],
        12,
        ['concat', ['get', 'maki'], '-11'],
      ],
      'text-offset': [0, 0.75],
      'text-rotation-alignment': 'viewport',
      'text-anchor': 'top',
      'text-field': [
        'step',
        ['get', 'sizerank'],
        ['coalesce', ['get', 'name_en'], ['get', 'name']],
        15,
        ['get', 'ref'],
      ],
      'text-max-width': 9,
    },
    paint: {
      'text-color': 'hsl(0, 69%, 50%)',
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 1,
    },
  },
  {
    id: 'transit-subway-line',
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'hsl(192, 70%, 43%)',
      'line-width': 2,
    },
    filter: ['==', ['get', 'type'], 'subway'],
  },
  {
    id: 'transit-rail-line',
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'hsl(201, 100%, 14%)',
      'line-width': 2,
    },
    filter: ['match', ['get', 'type'], 'rail'],
  },
  {
    id: 'mapbox-rail-road-line',
    type: 'line',
    source: 'composite',
    'source-layer': 'road',
    layout: {
      visibility: 'visible',
      'line-join': 'round',
    },
    minzoom: 13,

    paint: {
      'line-color': 'hsl(234, 20%, 30%)',
      'line-width': 6,
    },
    filter: [
      'all',
      ['match', ['get', 'class'], ['major_rail', 'minor_rail'], true, false],
      ['match', ['get', 'structure'], ['none', 'ford'], true, false],
    ],
  },
  {
    id: 'transit-bus-label',
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 12,
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(151, 24%, 60%)',
      'text-halo-width': 1,
      'text-color': 'hsl(13, 68%, 63%)',
    },
    filter: ['==', ['get', 'type'], 'bus_stop'],
  },
];
