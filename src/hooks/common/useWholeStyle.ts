// Dependencies
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWholeStyle, replaceWholeStyle } from '../../store/style/action';
import { addLog } from '../../store/history/action';

// Util
import setFeatureStyle from '../../utils/setFeatureStyle';

// Type
import {
  WholeStyleActionPayload,
  FeatureState,
  FeatureNameType,
  StyleStoreType,
  ReplaceType,
} from '../../store/common/type';

type LogInfoType = { changedKey: ReplaceType; changedValue?: string };
type FlagType = LogInfoType | boolean;
interface WholeStyleHook {
  flag: LogInfoType | boolean;
  getWholeStyle: () => StyleStoreType;
  changeStyle: (
    inputStyle: WholeStyleActionPayload,
    logInfo?: LogInfoType
  ) => void;
  replaceStyle: (inputStyle: StyleStoreType) => void;
}

function useWholeStyle(): WholeStyleHook {
  const [flag, setFlag] = useState<FlagType>(false);
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const { poi, landscape, administrative, road, transit, water } = useSelector<
    RootState
  >((state) => state) as StyleStoreType;

  useEffect(() => {
    if (!flag || !map) return;
    const stores: StyleStoreType = {
      poi,
      landscape,
      administrative,
      road,
      transit,
      water,
    };

    const features = Object.keys(stores) as FeatureNameType[];
    // eslint-disable-next-line no-restricted-syntax
    for (const feature of features) {
      setFeatureStyle({
        map,
        feature: feature as FeatureNameType,
        featureState: stores[feature] as FeatureState,
      });
    }
    if (flag !== true) {
      dispatch(addLog({ ...flag, wholeStyle: stores }));
    }
    setFlag(false);
  }, [flag]);

  const getWholeStyle = () => {
    return {
      poi,
      landscape,
      administrative,
      road,
      transit,
      water,
    };
  };

  const changeStyle = (
    inputStyle: WholeStyleActionPayload,
    logInfo?: LogInfoType
  ): void => {
    dispatch(setWholeStyle(inputStyle));
    setFlag(logInfo || true);
  };

  const replaceStyle = (inputStyle: StyleStoreType): void => {
    dispatch(replaceWholeStyle(inputStyle));
    setFlag(true);
  };

  return {
    flag,
    getWholeStyle,
    changeStyle,
    replaceStyle,
  };
}

export default useWholeStyle;
