import { stylingProps } from '.';
import { arterialLayerNames } from './road-categories/arterial';
import { localLayerNames } from './road-categories/local';
import { sidewalkLayerNames } from './road-categories/sidewalk';
import { allRoadLayerNames } from './road-categories/all';
import stylingCategory from './road-categories/stylingCategory';

function roadStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  type RoadSubFeatureType = 'all' | 'arterial' | 'local' | 'sidewalk';

  const mappingSubFeatureLayerNames = {
    all: allRoadLayerNames,
    arterial: arterialLayerNames,
    local: localLayerNames,
    sidewalk: sidewalkLayerNames,
  };

  stylingCategory({
    layerNames:
      mappingSubFeatureLayerNames[subFeatureName as RoadSubFeatureType],
    map,
    subFeatureName,
    detailName,
    subDetailName,
    key,
    style,
  });
}

export default roadStyling;
