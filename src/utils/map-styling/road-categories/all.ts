import { arterialLayerNames } from './arterial';
import { localLayerNames } from './local';
import { sidewalkLayerNames } from './sidewalk';

export const allRoadLayerNames = {
  all: [
    ...arterialLayerNames.all,
    ...localLayerNames.all,
    ...sidewalkLayerNames.all,
  ],
  polygon: [
    ...arterialLayerNames.polygon,
    ...localLayerNames.polygon,
    ...sidewalkLayerNames.polygon,
  ],
  line: [
    ...arterialLayerNames.line,
    ...localLayerNames.line,
    ...sidewalkLayerNames.line,
  ],
  stroke: [
    ...arterialLayerNames.stroke,
    ...localLayerNames.stroke,
    ...sidewalkLayerNames.stroke,
  ],
  text: {
    all: [
      ...arterialLayerNames.text.all,
      ...localLayerNames.text.all,
      ...sidewalkLayerNames.text.all,
    ],
    hasStroke: [
      ...arterialLayerNames.text.hasStroke,
      ...localLayerNames.text.hasStroke,
      ...sidewalkLayerNames.text.hasStroke,
    ],
    noStroke: [
      ...arterialLayerNames.text.noStroke,
      ...localLayerNames.text.noStroke,
      ...sidewalkLayerNames.text.noStroke,
    ],
  },
  icon: [],
};
