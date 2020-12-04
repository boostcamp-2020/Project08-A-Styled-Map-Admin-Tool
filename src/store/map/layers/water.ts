export default [
  {
    type: 'fill',
    source: 'polygon_source',
    'source-layer': 'polygon',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': 'hsl(243, 57%, 50%)',
      'fill-opacity': 0.5,
    },
    filter: ['==', ['get', 'type'], 'water'],
    id: 'water-polygon',
  },
];
