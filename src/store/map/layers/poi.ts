export default [
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(26, 25%, 32%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['milestone', 'arts_centre', 'fountain'],
      true,
      false,
    ],
    id: 'poi-attraction',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(22, 55%, 55%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      [
        'cinema',
        'bar',
        'post_box',
        'restaurant',
        'theatre',
        'studio',
        'bureau_de_change',
        'marketplace',
        'fast_food',
        'toll_booth',
        'charging_station',
        'social_facility',
        'nightclub',
        'food_court',
        'car_rental',
        'bicycle_rental',
        'pub',
        'bank',
        'ice_cream',
        'fuel',
      ],
      true,
      false,
    ],
    id: 'poi-business',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(26, 25%, 32%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      [
        'townhall',
        'social_centre',
        'post_office',
        'shelter',
        'embassy',
        'police',
      ],
      true,
      false,
    ],
    id: 'poi-government',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(340, 39%, 42%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['hospital', 'doctors', 'clinic', 'dentist', 'pharmacy'],
      true,
      false,
    ],
    id: 'poi-medical',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(100, 45%, 37%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['waste_basket', 'tree', 'rest_area'],
      true,
      false,
    ],
    id: 'poi-park',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(26, 25%, 32%)',
    },
    filter: ['match', ['get', 'type'], ['place_of_worship'], true, false],
    id: 'poi-worship',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'hsl(51, 40%, 40%)',
    },
    filter: [
      'match',
      ['get', 'type'],
      ['school', 'kindergarten', 'college'],
      true,
      false,
    ],
    id: 'poi-school',
  },
  {
    type: 'symbol',
    source: 'poi_source',
    'source-layer': 'poi',
    layout: {
      'text-size': 12,
      'text-field': ['get', 'name'],
      visibility: 'visible',
    },
    paint: {
      'text-halo-color': 'hsl(26, 25%, 32%)',
      'text-halo-width': 0.5,
      'text-halo-blur': 0.5,
      'text-color': 'green',
    },
    filter: [
      'in',
      'type',
      'parking',
      'crossing',
      'traffic_signal',
      'mini_roundabout',
      'bench',
      'sally port',
      'block',
      'street_lamp',
      'bollard',
      'lift_gate',
      'gate',
      'elevator',
      'toilets',
      'water_point',
      'spring',
      'atm',
    ],
    id: 'poi-etc',
  },
];
