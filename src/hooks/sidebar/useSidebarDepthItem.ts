import { RefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  AdministrativeNameType,
  ElementNameType,
  RoadNameType,
  StyleStoreType,
  SubElementNameType,
  SubFeatureActionPayload,
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

type IdFilterNames = RoadNameType | AdministrativeNameType;

interface useSidebarDepthItemType {
  depth: number;
  depthRef: RefObject<HTMLInputElement>;
  depthRangeHandler: () => void;
}

type changeableLayersByDepthType = {
  [keyType in DepthItemKeyTypes]: {
    [depth: number]: IdFilterNames[];
  };
};

const roadIdReg = /^road-/;
const administrativeIdReg = /^administrative-/;

const layers = initLayers.layers.map(({ id }) => id);
const roadLayerIds = layers.filter((name) => {
  return roadIdReg.test(name);
});
const administrativeLayerIds = layers.filter((name) => {
  return administrativeIdReg.test(name);
});

const getTargetLayerNames = (
  featureLayers: string[],
  targetLayers: IdFilterNames[]
) => {
  const targetNameReg = new RegExp(`\\S-(${targetLayers.join('|')})-`, 'i');
  const targetLayerNames = featureLayers.filter((name) =>
    targetNameReg.test(name)
  );
  return targetLayerNames;
};

const changeableLayersByDepth: changeableLayersByDepthType = {
  [DepthItemKeyTypes.administrative]: {
    2: [AdministrativeNameType.locality],
    1: [AdministrativeNameType.state],
  },
  [DepthItemKeyTypes.road]: {
    2: [RoadNameType.sidewalk, RoadNameType.local],
    1: [RoadNameType.arterial],
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

  const getDepthRange = () =>
    Array.from(Array(high - low).keys()).map((num) => num + low);

  return [visibility, getDepthRange()];
};

const getChangeStyleProps = (
  itemKey: DepthItemKeyTypes,
  depth: number,
  visibility: string,
  style: StyleStoreType
): StyleStoreType => {
  const subfeatureNames = changeableLayersByDepth[itemKey][depth];

  const visibilityPayload = { visibility };
  const subElementVisibility = {
    [SubElementNameType.fill]: visibilityPayload,
    [SubElementNameType.stroke]: visibilityPayload,
  };
  const labelTextVisibility = {
    [ElementNameType.labelText]: subElementVisibility,
  };
  const elementVisibility = {
    [ElementNameType.section]: subElementVisibility,
    [ElementNameType.labelText]: subElementVisibility,
  };

  const subFeaturePayload: SubFeatureActionPayload = {};
  subfeatureNames.forEach((subfeature) => {
    subFeaturePayload[subfeature] =
      subfeature === AdministrativeNameType.locality
        ? labelTextVisibility
        : elementVisibility;
  });

  const featurePayload = { ...style, [itemKey]: subFeaturePayload };
  return featurePayload;
};

function useSidebarDepthItem(
  itemKey: DepthItemKeyTypes
): useSidebarDepthItemType {
  const { roadDepth, administrativeDepth } = useSelector<RootState>(
    (state) => state.depthTheme
  ) as DepthThemePropsType;

  const [featureLayers, depth] = (itemKey === DepthItemKeyTypes.road
    ? [roadLayerIds, roadDepth]
    : [administrativeLayerIds, administrativeDepth]) as [string[], number];

  const dispatch = useDispatch();
  const depthRef = useRef<HTMLInputElement>(null);
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const { getWholeStyle, replaceStyle } = useWholeStyle();

  const depthRangeHandler = () => {
    const changedDepth = Number(depthRef.current?.value);
    const [visibility, depthRange] = getVisibilityAndDepthRange(
      depth,
      changedDepth
    );
    const currentStyleState = getWholeStyle();

    depthRange.forEach((depth) => {
      const targetLayers = changeableLayersByDepth[itemKey][depth];
      const layerNames = getTargetLayerNames(featureLayers, targetLayers);
      applyVisibility({ map, layerNames, visibility });
      const changedStyle = getChangeStyleProps(
        itemKey,
        depth,
        visibility,
        currentStyleState
      );
      replaceStyle(changedStyle);
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
