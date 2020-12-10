interface WeightTemplate {
  [subFeature: string]: {
    [element: string]: any;
  };
}

const weightTemplate: WeightTemplate = {
  highway: {
    fill: (weight: number) => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      5,
      weight,
      18,
      weight * 5 + 25,
    ],
    stroke: (weight: number) => [
      'interpolate',
      ['exponential', 1.5],
      ['zoom'],
      12,
      weight,
      14,
      weight * 2,
      18,
      weight * 2 + 10,
    ],
  },
};

export default weightTemplate;
