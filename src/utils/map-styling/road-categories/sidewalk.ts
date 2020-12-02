export const sidewalkLayerNames = {
  all: ['road-footway', 'road-sidewalk-label'],
  polygon: [
    'road-pedestrian-polygon-fill',
    'road-pedestrian-polygon-pattern',
    'road-sidewalk-polygon',
  ],
  line: ['road-footway', 'road-pedestrian', 'road-steps', 'road-path'],
  stroke: ['road-pedestrian-case'],
  text: {
    all: ['road-sidewalk-label'],
    hasStroke: ['road-sidewalk-label'],
    noStroke: [],
  },
  icon: [],
};
