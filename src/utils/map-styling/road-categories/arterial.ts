export const arterialLayerNames = {
  all: [
    'road-arterial',
    'road-number-shield',
    'road-exit-shield',
    'road-arterial-label',
  ],
  polygon: ['road-arterial-polygon'],
  line: [
    'road-arterial',
    'road-primary',
    'road-secondary-tertiary',
    'road-motorway-trunk',
    'road-minor',
    'road-minor-low',
  ],
  stroke: [
    'road-primary-case',
    'road-secondary-tertiary-case',
    'road-motorway-trunk-case',
    'road-minor-case',
    'road-minor-low',
  ],
  text: {
    all: ['road-number-shield', 'road-exit-shield', 'road-arterial-label'],
    hasStroke: ['road-arterial-label'],
    noStroke: ['road-number-shield', 'road-exit-shield'],
  },
  icon: [],
};
