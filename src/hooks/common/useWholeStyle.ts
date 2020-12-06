import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWholeStyle } from '../../store/style/action';
import {
  WholeStyleActionPayload,
  FeatureState,
  FeatureNameType,
} from '../../store/common/type';
import { useEffect, useState } from 'react';
import setFeatureStyle from '../../utils/setFeatureStyle';

interface WholeStyleHook {
  flag: boolean;
  changeStyle: (inputStyle: WholeStyleActionPayload) => void;
}

function useWholeStyle(): WholeStyleHook {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const poi = useSelector<RootState>((state) => state.poi) as FeatureState;
  const landscape = useSelector<RootState>(
    (state) => state.landscape
  ) as FeatureState;
  const administrative = useSelector<RootState>(
    (state) => state.administrative
  ) as FeatureState;
  const road = useSelector<RootState>((state) => state.road) as FeatureState;
  const transit = useSelector<RootState>(
    (state) => state.transit
  ) as FeatureState;
  const water = useSelector<RootState>((state) => state.water) as FeatureState;

  useEffect(() => {
    if (!flag) return;

    setFeatureStyle({ map, feature: FeatureNameType.poi, featureState: poi });
    setFeatureStyle({
      map,
      feature: FeatureNameType.landscape,
      featureState: landscape,
    });
    setFeatureStyle({
      map,
      feature: FeatureNameType.administrative,
      featureState: administrative,
    });
    setFeatureStyle({
      map,
      feature: FeatureNameType.road,
      featureState: road,
    });
    setFeatureStyle({
      map,
      feature: FeatureNameType.transit,
      featureState: transit,
    });
    setFeatureStyle({
      map,
      feature: FeatureNameType.water,
      featureState: water,
    });

    setFlag(false);
  }, [flag]);

  const changeStyle = (inputStyle: WholeStyleActionPayload): void => {
    setFlag(true);
    dispatch(setWholeStyle(inputStyle));
  };

  return {
    flag,
    changeStyle,
  };
}

export default useWholeStyle;
