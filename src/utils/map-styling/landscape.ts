import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  VisibilityType,
} from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  SubFeatureNameType,
  objType,
  SubElementNameType,
} from '../../store/common/type';
import layers from '../rendering-data/layers/landscape';

const init = {
  section: { fill: [], stroke: [] },
  labelText: { fill: [], stroke: [] },
  labelIcon: [],
};

const landscape = layers.reduce(
  (prev, cur) => {
    const [subFeature, element, subElement] = cur.id.split('-');
    const list = prev;
    if (!list.type[subFeature]) {
      list.id[subFeature] = JSON.parse(JSON.stringify(init));
      list.type[subFeature] = JSON.parse(JSON.stringify(init));
    }
    const { id, type } = cur;

    if (element === ElementNameType.section) {
      list.id[subFeature][element][subElement].push(id);
      list.type[subFeature][element][subElement].push(type);

      list.id[SubFeatureNameType.all][element][subElement].push(id);
      list.type[SubFeatureNameType.all][element][subElement].push(type);
    } else if (element === ElementNameType.labelText) {
      list.id[subFeature][element][SubElementNameType.fill].push(id);
      list.type[subFeature][element][SubElementNameType.fill].push(type);

      list.id[subFeature][element][SubElementNameType.stroke].push(id);
      list.type[subFeature][element][SubElementNameType.stroke].push(type);

      list.id[SubFeatureNameType.all][element][SubElementNameType.fill].push(
        id
      );
      list.type[SubFeatureNameType.all][element][SubElementNameType.fill].push(
        type
      );

      list.id[SubFeatureNameType.all][element][SubElementNameType.stroke].push(
        id
      );
      list.type[SubFeatureNameType.all][element][
        SubElementNameType.stroke
      ].push(type);
    } else {
      list.id[subFeature][element].push(id);
      list.type[subFeature][element].push('icon');

      list.id[SubFeatureNameType.all][element].push(id);
      list.type[SubFeatureNameType.all][element].push('icon');
    }
    return list;
  },
  {
    id: { all: JSON.parse(JSON.stringify(init)) },
    type: { all: JSON.parse(JSON.stringify(init)) },
  } as objType
);

type ColorVariableType =
  | 'fill'
  | 'line'
  | 'text'
  | 'background'
  | 'icon'
  | 'textHalo';
type WeightVariableType = 'line' | 'textHalo';

type StyleVariableType = ColorVariableType | WeightVariableType | 'symbol';
interface getTypeProps {
  element: ElementNameType;
  subElement: SubElementNameType;
  type: StyleVariableType;
}

const getType = ({ element, subElement, type }: getTypeProps) => {
  if (element === ElementNameType.labelIcon) return 'icon';
  if (type !== 'symbol') return type;

  if (subElement === SubElementNameType.stroke) return 'textHalo';
  return 'text';
};

const INVISIBLE = 0;

function landscapeStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  const idList = subElement
    ? (landscape.id[subFeature][element][subElement] as string[])
    : (landscape.id[subFeature][element] as string[]);

  const typeList = subElement
    ? (landscape.type[subFeature][element][subElement] as StyleVariableType[])
    : (landscape.type[subFeature][element] as StyleVariableType[]);

  if (key === StyleKeyType.weight) {
    for (let i = 0; i < idList.length; i += 1) {
      if (style.visibility !== VisibilityType.none) {
        const type = getType({
          element,
          subElement,
          type: typeList[i],
        });
        applyWeight({
          map,
          layerNames: [idList[i]],
          type: WeightType[type as WeightVariableType] as WeightType,
          weight: style[key],
        });
      }
    }
    return;
  }

  if (key === StyleKeyType.visibility) {
    for (let i = 0; i < idList.length; i += 1) {
      const type = getType({ element, subElement, type: typeList[i] });
      if (type === 'textHalo') {
        applyWeight({
          map,
          layerNames: [idList[i]],
          type: WeightType[type] as WeightType,
          weight:
            style.visibility === VisibilityType.none ? INVISIBLE : style.weight,
        });
      } else {
        applyVisibility({
          map,
          layerNames: [idList[i]],
          visibility: style[key],
        });
      }
    }

    return;
  }

  for (let i = 0; i < idList.length; i += 1) {
    const type = getType({ element, subElement, type: typeList[i] });
    applyColor({
      map,
      layerNames: [idList[i]],
      type: ColorType[type] as ColorType,
      color: style.color,
      [key]: style[key],
    });
  }
}

export default landscapeStyling;
