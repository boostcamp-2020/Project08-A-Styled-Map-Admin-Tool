export default [
  {
    type: 'line',
    source: 'polygon_source',
    'source-layer': 'polygon',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'brown',
      'line-width': 4,
    },
    filter: ['match', ['get', 'type'], 'city_wall', true, false],
    id: 'city-wall',
  },
  {
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': '#ff00ff',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['road', 'primary', 'secondary', 'teritiary'],
      true,
      false,
    ],
    id: 'road-arterial',
  },
  {
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'blue',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['cycleway', 'path', 'living_street', 'service'],
      true,
      false,
    ],
    id: 'road-local',
  },
  {
    type: 'line',
    source: 'line_source',
    'source-layer': 'line',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'line-color': 'red',
    },
    filter: ['match', ['get', 'type'], ['pedestrian', 'footway'], true, false],
    id: 'road-footway',
  },
];
