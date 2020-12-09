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
      list.type[subFeature] = JSON.parse(JSON.stringify(init));
      list.type[subFeature] = JSON.parse(JSON.stringify(init));
    }

    if (element === ElementNameType.section) {
      list.id[subFeature][element][subElement].push(cur.id);
      list.type[subFeature][element][subElement].push(cur.type);
    } else if (element === ElementNameType.labelText) {
      list.id[subFeature][element][SubElementNameType.fill].push(cur.id);
      list.type[subFeature][element][SubElementNameType.fill].push(cur.type);
      list.id[subFeature][element][SubElementNameType.stroke].push(cur.id);
      list.type[subFeature][element][SubElementNameType.stroke].push(cur.type);
    } else {
      list.id[subFeature][element].push(cur.id);
      list.type[subFeature][element].push(cur.type);
    }
    return list;
  },
  { id: {}, type: {} } as objType
);

landscape.id.all = layers.map((layer) => layer.id);
landscape.type.all = layers.map((layer) => layer.type);

interface getTypeProps {
  element: ElementNameType;
  subElement: SubElementNameType;
  type: number;
}

const getType = ({ element, subElement, type }: getTypeProps) => {
  return element === ElementNameType.labelText &&
    subElement === SubElementNameType.stroke
    ? 'textHalo'
    : type;
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
  let idList;
  let typeList;

  if (subFeature === 'all') {
    idList = landscape.id.all;
    typeList = landscape.type.all;
  } else {
    idList = subElement
      ? (landscape.id[subFeature][element][subElement] as string[])
      : (landscape.id[subFeature][element] as string[]);

    typeList = subElement
      ? (landscape.type[subFeature][element][subElement] as number[])
      : (landscape.type[subFeature][element] as number[]);
  }

  if (key === StyleKeyType.weight) {
    for (let i = 0; i < idList.length; i += 1) {
      if (style.visibility !== VisibilityType.none) {
        applyWeight({
          map,
          layerNames: [idList[i]],
          type: getType({
            element,
            subElement,
            type: typeList[i],
          }) as WeightType,
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
          type: type as WeightType,
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
    applyColor({
      map,
      layerNames: [idList[i]],
      type: getType({ element, subElement, type: typeList[i] }) as ColorType,
      color: style.color,
      [key]: style[key],
    });
  }
}

export default landscapeStyling;
