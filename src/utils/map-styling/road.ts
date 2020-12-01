import { stylingProps } from '.';
import { applyVisibility, applyColor, applyWeight } from '../applyStyle';

type KeyType = 'visibility' | 'color' | 'weight' | 'saturation' | 'lightness';

function roadStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  const { visibility, color, weight, saturation, lightness } = style;
  const arterialLayerNames = [
    'road-number-shield',
    'road-exit-shield',
    'road-label',
    'road-arterial',
  ];
  const localLayerNames = ['ferry', 'ferry-auto', 'road-local'];
  const sidewalkLayerNames = ['road-footway'];

  /**
   * visibility 가 바뀌는 것 우선은 여기에서 처리, inherit (visible 처리)
   * color, saturation, lightness 한 함수로 처리
   *   - section
   *     - fill : line 'line-color', symbol, polygon 'fill-color'
   *     - stroke : line 'case layer'의 색상, symbol 불변, polygon이면 불변
   *   - label
   *     - text fill: 'text-color', 'text-width'
   *     - text stroke: 'text-halo-color', 'text-halo-width'
   *
   * cf. 채도와 밝기가 크게 달라지는 것 같지 않다.. line인 탓일까..?
   */

  /**
   * 20.12.01.
   * highway : 분류 보류
   * aterial: line이라 채우기 윤곽선은 한번에 처리, 채우기 윤곽선 확인완료, 아이콘 없음
   * local: 지금 있는 것들은 section fill밖에 의미없음
   * sidewalk
   */

  if (subFeatureName === 'arterial') {
    if (detailName === 'section' && key === 'visibility') {
      applyVisibility(map, arterialLayerNames, visibility);
    } else if (key === ('color' || 'saturation' || 'lightness')) {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['road-arterial'],
          color,
          type: 'line-color',
          saturation,
          lightness,
        });
      } else if (detailName === 'labelText' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['road-number-shield', 'road-exit-shield', 'road-label'],
          color,
          type: 'text-color',
          saturation,
          lightness,
        });
      } else if (detailName === 'labelText' && subDetailName === 'stroke') {
        applyColor({
          map,
          layerNames: ['road-label'],
          color,
          type: 'text-halo-color',
          saturation,
          lightness,
        });
      }
    } else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyWeight(map, ['road-arterial'], 'line-width', weight);
      }
      if (detailName === 'labelText' && subDetailName === 'stroke')
        applyWeight(map, ['road-label'], 'text-halo-width', weight);
    }
  } else if (subFeatureName === 'local') {
    if (key === 'visibility') applyVisibility(map, localLayerNames, visibility);
    else if (key === ('color' || 'saturation' || 'lightness')) {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['ferry', 'ferry-auto', 'road-local'],
          color,
          type: 'line-color',
          saturation,
          lightness,
        });
      }
    } else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyWeight(
          map,
          ['ferry', 'ferry-auto', 'road-local'],
          'line-width',
          weight
        );
    }
  }
}

// if (subFeatureName === ('highway' || 'bicycle-road')) {
//   /**
//    * There is no highway layer and bicycle-road
//    */
// } else

// else if (subFeatureName === 'local') {
//   if (key === 'visibility') applyVisibility(map, localLayerNames, visibility);
// } else if (subFeatureName === 'sidewalk') {
//   // weight 관련 속성 없음
//   if (key === 'visibility')
//     applyVisibility(map, sidewalkLayerNames, visibility);
//   if (key === ('color' || 'saturation' || 'lightness')) {
//     applyColor({
//       map,
//       layerNames: sidewalkLayerNames,
//       color,
//       type: 'line-color',
//       saturation,
//       lightness,
//     });
//   }

export default roadStyling;
