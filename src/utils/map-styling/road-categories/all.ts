import { highwayLayerNames } from './highway';
import { arterialLayerNames } from './arterial';
import { localLayerNames } from './local';
import { sidewalkLayerNames } from './sidewalk';

export const allRoadLayerNames = {
  all: [
    ...highwayLayerNames.all,
    ...arterialLayerNames.all,
    ...localLayerNames.all,
    ...sidewalkLayerNames.all,
  ],
  polygon: [
    ...highwayLayerNames.polygon,
    ...arterialLayerNames.polygon,
    ...localLayerNames.polygon,
    ...sidewalkLayerNames.polygon,
  ],
  line: [
    ...highwayLayerNames.line,
    ...arterialLayerNames.line,
    ...localLayerNames.line,
    ...sidewalkLayerNames.line,
  ],
  stroke: [
    ...highwayLayerNames.stroke,
    ...arterialLayerNames.stroke,
    ...localLayerNames.stroke,
    ...sidewalkLayerNames.stroke,
  ],
  text: {
    all: [
      ...highwayLayerNames.text.all,
      ...arterialLayerNames.text.all,
      ...localLayerNames.text.all,
      ...sidewalkLayerNames.text.all,
    ],
    hasStroke: [
      ...highwayLayerNames.text.hasStroke,
      ...arterialLayerNames.text.hasStroke,
      ...localLayerNames.text.hasStroke,
      ...sidewalkLayerNames.text.hasStroke,
    ],
    noStroke: [
      ...highwayLayerNames.text.noStroke,
      ...arterialLayerNames.text.noStroke,
      ...localLayerNames.text.noStroke,
      ...sidewalkLayerNames.text.noStroke,
    ],
  },
  icon: [
    ...highwayLayerNames.icon,
    ...arterialLayerNames.icon,
    ...localLayerNames.icon,
    ...sidewalkLayerNames.icon,
  ],
};
