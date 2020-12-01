export default [
  {
    type: 'fill',
    source: 'polygon_source',
    'source-layer': 'polygon',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': '#000000',
      'fill-opacity': 0.5,
    },
    filter: ['==', ['get', 'type'], 'water'],
    id: 'water-polygon',
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
    filter: ['match', ['get', 'type'], ['river', 'stream'], true, false],
    id: 'water-line',
  },
];
