import { RefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ElementActionPayload,
  ElementNameType,
  SubElementNameType,
  SubFeatureActionPayload,
  WholeStyleActionPayload,
} from '../../store/common/type';
import {
  DepthThemePropsType,
  setShowDepthProperties,
} from '../../store/depth-theme/action';
import { applyVisibility, VisibilityType } from '../../utils/applyStyle';
import initLayers from '../../utils/rendering-data/layers/init';
import useWholeStyle from '../common/useWholeStyle';

export enum DepthItemKeyTypes {
  administrative = 'administrative',
  road = 'road',
}

enum idFilterNames {
  arterial = 'arterial',
  sidewalk = 'sidewalk',
  local = 'local',
  state = 'state',
  settlement = 'settlement',
}

interface useSidebarDepthItemType {
  depth: number;
  depthRef: RefObject<HTMLInputElement>;
  depthRangeHandler: () => void;
}

type changeableLayersByDepthType = {
  [keyType in DepthItemKeyTypes]: {
    [depth: number]: {
      targetLayers: idFilterNames[];
      layerNames: string[];
    };
  };
};

const layers = initLayers.layers.map(({ id }) => id);
const roadLayerIds = layers.filter((name) => {
  const roadIdReg = /^road-/;
  return roadIdReg.test(name);
});
const administrativeLayerIds = layers.filter((name) => {
  const administrativeIdReg = /^administrative-/;
  return administrativeIdReg.test(name);
});

const changeableLayersByDepth: changeableLayersByDepthType = {
  [DepthItemKeyTypes.administrative]: {
    2: {
      targetLayers: [idFilterNames.settlement],
      layerNames: administrativeLayerIds.filter((id) =>
        id.includes(idFilterNames.settlement)
      ),
    },
    1: {
      targetLayers: [idFilterNames.state],
      layerNames: administrativeLayerIds.filter((id) =>
        id.includes(idFilterNames.state)
      ),
    },
  },
  [DepthItemKeyTypes.road]: {
    2: {
      targetLayers: [idFilterNames.sidewalk],
      layerNames: roadLayerIds.filter((id) =>
        id.includes(idFilterNames.sidewalk)
      ),
    },
    1: {
      targetLayers: [idFilterNames.arterial, idFilterNames.local],
      layerNames: roadLayerIds.filter(
        (id) =>
          id.includes(idFilterNames.arterial) ||
          id.includes(idFilterNames.local)
      ),
    },
  },
};

const getVisibilityAndDepthRange = (
  currentDepth: number,
  changedDepth: number
): [string, number[]] => {
  const [visibility, high, low] =
    currentDepth > changedDepth
      ? [VisibilityType.none, currentDepth, changedDepth]
      : [VisibilityType.visible, changedDepth, currentDepth];

  return [
    visibility,
    Array.from(Array(high - low).keys()).map((num) => num + low),
  ];
};

const getChangeStyleProps = (
  itemKey: DepthItemKeyTypes,
  depth: number,
  visibility: string
): WholeStyleActionPayload => {
  const subfeatureNames = changeableLayersByDepth[itemKey][depth].targetLayers;

  const visibilityPayload = { visibility };

  const sectionVisibility: ElementActionPayload = {
    [ElementNameType.section]: {
      [SubElementNameType.fill]: visibilityPayload,
      [SubElementNameType.stroke]: visibilityPayload,
    },
  };

  const subFeaturePayload: SubFeatureActionPayload = {};

  subfeatureNames.forEach((currentName) => {
    subFeaturePayload[currentName] = sectionVisibility;
  });

  const featurePayload = { [itemKey]: subFeaturePayload };
  return featurePayload;
};

function useSidebarDepthItem(
  itemKey: DepthItemKeyTypes
): useSidebarDepthItemType {
  const { roadDepth, administrativeDepth } = useSelector<RootState>(
    (state) => state.depthTheme
  ) as DepthThemePropsType;
  const depth = (itemKey === DepthItemKeyTypes.road
    ? roadDepth
    : administrativeDepth) as number;

  const dispatch = useDispatch();
  const depthRef = useRef<HTMLInputElement>(null);
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  const { changeStyle } = useWholeStyle();

  const depthRangeHandler = () => {
    const changedDepth = Number(depthRef.current?.value);
    const [visibility, depthRange] = getVisibilityAndDepthRange(
      depth,
      changedDepth
    );
    depthRange.forEach((depth) => {
      const { layerNames } = changeableLayersByDepth[itemKey][depth];
      applyVisibility({ map, layerNames, visibility });
      const changedStyle = getChangeStyleProps(itemKey, depth, visibility);
      changeStyle(changedStyle);
    });
    dispatch(
      setShowDepthProperties({
        selectedFeature: itemKey,
        selectedDepth: changedDepth,
      })
    );
  };

  return {
    depth,
    depthRef,
    depthRangeHandler,
  };
}

export default useSidebarDepthItem;
