import { RefObject, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { applyVisibility, VisibilityType } from '../../utils/applyStyle';
import administrativeLayers from '../../utils/rendering-data/layers/administrative.json';
import roadLayers from '../../utils/rendering-data/layers/road.json';

export enum DepthItemKeyTypes {
  administrative = 'administrative',
  road = 'road',
}

enum idFilterNames {
  sidewalk = 'sidewalk',
  local = 'local',
  country = 'country',
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
    [depth: number]: string[];
  };
};

const roadLayerIds = roadLayers.road.map(({ id }) => id);
const administrativeLayerIds = administrativeLayers.administrative.map(
  ({ id }) => id
);

const changeableLayersByDepth: changeableLayersByDepthType = {
  [DepthItemKeyTypes.administrative]: {
    2: administrativeLayerIds.filter((id) =>
      id.includes(idFilterNames.settlement)
    ),
    1: administrativeLayerIds.filter((id) => id.includes(idFilterNames.state)),
  },
  [DepthItemKeyTypes.road]: {
    2: roadLayerIds.filter((id) => id.includes(idFilterNames.sidewalk)),
    1: roadLayerIds.filter((id) => id.includes(idFilterNames.local)),
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

function useSidebarDepthItem(
  itemKey: DepthItemKeyTypes
): useSidebarDepthItemType {
  const [depth, setDepth] = useState<number>(3);
  const depthRef = useRef<HTMLInputElement>(null);
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  const depthRangeHandler = () => {
    const changedDepth = Number(depthRef.current?.value);
    const [visibility, depthRange] = getVisibilityAndDepthRange(
      depth,
      changedDepth
    );
    depthRange.forEach((depth) => {
      const layerNames = changeableLayersByDepth[itemKey][depth];
      applyVisibility({ map, layerNames, visibility });
    });
    setDepth(changedDepth);
  };

  return {
    depth,
    depthRef,
    depthRangeHandler,
  };
}

export default useSidebarDepthItem;
