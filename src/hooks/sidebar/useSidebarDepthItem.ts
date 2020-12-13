import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import {
  AdministrativeNameType,
  ReplaceType,
  RoadNameType,
  StyleStoreType,
  VisibilityValueType,
  WholeStyleActionPayload,
  FeatureNameType,
} from '../../store/common/type';
import { setShowDepthProperties } from '../../store/depth-theme/action';
import useWholeStyle from '../common/useWholeStyle';
import { setWholeStyle } from '../../store/style/action';
import setFeatureStyle from '../../utils/setFeatureStyle';
import { addLog } from '../../store/history/action';

export enum DepthItemKeyTypes {
  administrative = 'administrativeDepth',
  road = 'roadDepth',
}

type IdFilterNames = RoadNameType | AdministrativeNameType;

type changeableLayersByDepthType = {
  [keyType in DepthItemKeyTypes]: {
    [depth: number]: IdFilterNames[];
  };
};

const changeableLayersByDepth: changeableLayersByDepthType = {
  [DepthItemKeyTypes.administrative]: {
    2: [AdministrativeNameType.locality, AdministrativeNameType.state],
    1: [AdministrativeNameType.country],
  },
  [DepthItemKeyTypes.road]: {
    2: [RoadNameType.sidewalk, RoadNameType.local],
    1: [RoadNameType.arterial],
  },
};

const getVisibilityAndDepthRange = (
  currentDepth: number,
  changedDepth: number
): [VisibilityValueType, number[]] => {
  const [visibility, high, low] =
    currentDepth > changedDepth
      ? [VisibilityValueType.none, currentDepth, changedDepth]
      : [VisibilityValueType.visible, changedDepth, currentDepth];
  const getDepthRange = () =>
    Array.from(Array(high - low).keys()).map((num) => num + low);
  return [visibility, getDepthRange()];
};

const getChangeStyle = (
  feature: FeatureNameType,
  subfeatures: string[],
  visibility: VisibilityValueType,
  style: StyleStoreType
): WholeStyleActionPayload => {
  const changeStyle = JSON.parse(JSON.stringify(style));

  subfeatures.forEach((subFeature) => {
    if (feature === FeatureNameType.road) {
      changeStyle[feature][subFeature].labelIcon.visibility = visibility;
    }
    changeStyle[feature][subFeature].section.fill.visibility = visibility;
    changeStyle[feature][subFeature].section.stroke.visibility = visibility;
    changeStyle[feature][subFeature].labelText.fill.visibility = visibility;
    changeStyle[feature][subFeature].labelText.stroke.visibility = visibility;
  });

  return { [feature]: changeStyle[feature] };
};

interface useSidebarDepthItemType {
  itemDepth: number;
  depthRangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
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
  const [flag, setFlag] = useState(false);
  const { getWholeStyle } = useWholeStyle();

  const feature =
    itemKey === DepthItemKeyTypes.road
      ? FeatureNameType.road
      : FeatureNameType.administrative;

  useEffect(() => {
    if (!flag || !map) return;
    const currentStyleState = getWholeStyle();
    setFeatureStyle({
      map,
      feature,
      featureState: currentStyleState[feature],
    });

    dispatch(
      addLog({
        changedKey: ReplaceType.depth,
        changedValue: { feature, depth: itemDepth },
        wholeStyle: currentStyleState,
      })
    );

    setFlag(false);
  }, [flag]);

  const depthRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedDepth = Number(e.target.value);
    const [visibility, depthRange] = getVisibilityAndDepthRange(
      itemDepth,
      changedDepth
    );

    const subfeatures = depthRange.reduce((prev: IdFilterNames[], cur) => {
      const layers = [...prev, ...changeableLayersByDepth[itemKey][cur]];
      return layers;
    }, []);

    const currentStyleState = getWholeStyle();
    const changeStyleState = getChangeStyle(
      feature,
      subfeatures,
      visibility,
      currentStyleState
    );

    dispatch(setWholeStyle(changeStyleState));

    dispatch(
      setShowDepthProperties({
        selectedFeature: itemKey,
        selectedDepth: changedDepth,
      })
    );
    setFlag(true);
  };

  return {
    itemDepth,
    depthRangeHandler,
  };
}

export default useSidebarDepthItem;
