export const sidewalkLayerNames = {
  all: [
    'road-footway',
    'road-sidewalk-label',
    'road-pedestrian-polygon-fill',
    'road-pedestrian-polygon-pattern',
    'road-sidewalk-polygon',
    'road-pedestrian',
    'road-steps',
    'road-path',
    'road-pedestrian-case',
    'city-wall',
  ],
  polygon: [
    'road-pedestrian-polygon-fill',
    'road-pedestrian-polygon-pattern',
    'road-sidewalk-polygon',
  ],
  line: [
    'road-footway',
    'road-pedestrian',
    'road-steps',
    'road-path',
    'city-wall',
  ],
  stroke: ['road-pedestrian-case'],
  text: {
    all: ['road-sidewalk-label'],
    hasStroke: ['road-sidewalk-label'],
    noStroke: [],
  },
  icon: [],
};
