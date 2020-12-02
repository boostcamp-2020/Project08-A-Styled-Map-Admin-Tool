import { stylingProps } from '.';
import arterialStyling from './road-categories/arterial';
import localStyling from './road-categories/local';
import sidewalkStyling from './road-categories/sidewalk';

function roadStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  if (subFeatureName === 'arterial') {
    arterialStyling({
      map,
      subFeatureName,
      detailName,
      subDetailName,
      key,
      style,
    });
  } else if (subFeatureName === 'local') {
    localStyling({
      map,
      subFeatureName,
      detailName,
      subDetailName,
      key,
      style,
    });
  } else if (subFeatureName === 'sidewalk') {
    sidewalkStyling({
      map,
      subFeatureName,
      detailName,
      subDetailName,
      key,
      style,
    });
  }
}

export default roadStyling;
