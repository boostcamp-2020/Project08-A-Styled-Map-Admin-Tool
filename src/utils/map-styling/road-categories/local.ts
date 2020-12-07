export const localLayerNames = {
  all: [
    'road-local-polygon',
    'ferry',
    'ferry-auto',
    'road-street',
    'road-street-case',
    'road-local-label',
  ],
  polygon: ['road-local-polygon'],
  line: ['ferry', 'ferry-auto', 'road-street'],
  stroke: ['road-street-case'],
  text: {
    all: ['road-local-label'],
    hasStroke: ['road-local-label'],
    noStroke: [],
  },
  icon: [],
};
