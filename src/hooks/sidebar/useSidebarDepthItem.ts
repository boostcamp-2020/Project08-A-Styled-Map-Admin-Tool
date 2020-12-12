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
import { setShowDepthProperties } from '../../store/depth-theme/action';
import { applyVisibility, VisibilityType } from '../../utils/applyStyle';
import initLayers from '../../utils/rendering-data/layers/init';
import useWholeStyle from '../common/useWholeStyle';

export enum DepthItemKeyTypes {
  administrative = 'administrativeDepth',
  road = 'roadDepth',
}

type IdFilterNames = RoadNameType | AdministrativeNameType;

interface useSidebarDepthItemType {
  itemDepth: number;
  depthRangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

interface ReduxStateType {
  map: mapboxgl.Map;
  itemDepth: number;
}

function useSidebarDepthItem(
  itemKey: DepthItemKeyTypes
): useSidebarDepthItemType {
  const dispatch = useDispatch();
  const { map, itemDepth } = useSelector<RootState>((state) => ({
    map: state.map.map,
    itemDepth:
      itemKey === DepthItemKeyTypes.road
        ? state.depthTheme.roadDepth
        : state.depthTheme.administrativeDepth,
  })) as ReduxStateType;

  const featureLayers =
    itemKey === DepthItemKeyTypes.road ? roadLayerIds : administrativeLayerIds;

  const { getWholeStyle, replaceStyle } = useWholeStyle();

  const depthRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedDepth = Number(e.target.value);
    const [visibility, depthRange] = getVisibilityAndDepthRange(
      itemDepth,
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
    itemDepth,
    depthRangeHandler,
  };
}

export default useSidebarDepthItem;
