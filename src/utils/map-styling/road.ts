import { stylingProps } from '.';
import { applyVisibility, applyColor, applyWeight } from '../applyStyle';

type KeyType = 'visibility' | 'color' | 'weight' | 'saturation' | 'lightness';

/**
 * visibility inherit 처리 applyStyle에서
 * color, saturation, lightness 한 함수로 처리
 *   - section
 *     - fill : line 'line-color', symbol, polygon 'fill-color'
 *     - stroke : line 'case layer'의 색상, symbol 불변, polygon이면 불변
 *   - label
 *     - text fill: 'text-color', 'text-width'
 *     - text stroke: 'text-halo-color', 'text-halo-width'
 *
 */

/**
 * 20.12.01.
 * highway : 분류 보류
 * aterial: line이라 채우기 윤곽선은 한번에 처리, 채우기 윤곽선 확인완료, 아이콘 없음
 * local: 지금 있는 것들은 section fill밖에 의미없음
 * sidewalk: 확인 완료
 *
 * 색상을 변경하지 않은채로 채도나 밝기부터 선택하면 색상팔레트 색 기준으로 조정이 됨
 * fix 필요
 */

function roadStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  const { visibility, color, weight } = style;
  const arterialLayerNames = [
    'road-number-shield',
    'road-exit-shield',
    'road-label',
    'road-arterial',
  ];
  const localLayerNames = ['ferry', 'ferry-auto', 'road-local'];
  const sidewalkLayerNames = ['road-footway'];

  if (subFeatureName === 'arterial') {
    if (
      detailName === 'section' &&
      subDetailName === 'fill' &&
      key === 'visibility'
    ) {
      applyVisibility(map, arterialLayerNames, visibility);
    } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['road-arterial'],
          color,
          type: 'line-color',
          [key]: style[key as KeyType],
        });
      } else if (detailName === 'labelText' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['road-number-shield', 'road-exit-shield', 'road-label'],
          color,
          type: 'text-color',
          [key]: style[key as KeyType],
        });
      } else if (detailName === 'labelText' && subDetailName === 'stroke') {
        applyColor({
          map,
          layerNames: ['road-label'],
          color,
          type: 'text-halo-color',
          [key]: style[key as KeyType],
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
    else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['ferry', 'ferry-auto', 'road-local'],
          color,
          type: 'line-color',
          [key]: style[key as KeyType],
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
  } else if (subFeatureName === 'sidewalk') {
    if (key === 'visibility')
      applyVisibility(map, sidewalkLayerNames, visibility);
    else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyWeight(map, sidewalkLayerNames, 'line-width', weight);
    } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyColor({
          map,
          layerNames: sidewalkLayerNames,
          color,
          type: 'line-color',
          [key]: style[key as KeyType],
        });
    }
  }
}

export default roadStyling;
