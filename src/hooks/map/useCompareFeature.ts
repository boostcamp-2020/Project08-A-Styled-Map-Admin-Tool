/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// Dependencies
import { useState, RefObject, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import getCompareMap from './getCompareMap';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Type
import {
  HistoryState,
  FeatureNameType,
  FeatureState,
} from '../../store/common/type';

// Util
import initLayers from '../../utils/rendering-data/layers/init';
import setFeatureStyle from '../../utils/setFeatureStyle';

export interface mapProps {
  container: string | HTMLElement;
  [key: string]: string | HTMLElement;
}

export interface useComparisonButtonType {
  logId: string | undefined;
  setLogId: (id: string | undefined) => void;
  comparisonButtonClickHandler: (id: string) => void;
}

export interface useCompareFeatureProps {
  containerRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}
interface ReduxStateType extends HistoryState {
  map: mapboxgl.Map;
}

function useCompareFeature({
  containerRef,
  beforeMapRef,
}: useCompareFeatureProps): useComparisonButtonType {
  const [logId, setLogId] = useState<string>();
  const [beforeMap, setBeforeMap] = useState<mapboxgl.Map | null>(null);
  const { map, log } = useSelector<RootState>((state) => ({
    map: state.map.map,
    log: state.history.log,
  })) as ReduxStateType;

  useEffect(() => {
    if (!map) return;

    const newMap = new mapboxgl.Map({
      container: beforeMapRef.current as HTMLDivElement,
      style: initLayers as mapboxgl.Style,
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom: map.getZoom(),
    });

    setBeforeMap(newMap);
  }, [map]);

  useEffect(() => {
    if (!map || !logId || !beforeMap || !log) return;

    const [item] = log?.filter((val) => val.id === logId) || [];
    const { wholeStyle } = item;

    for (const feature in wholeStyle) {
      setFeatureStyle({
        map: beforeMap as mapboxgl.Map,
        feature: feature as FeatureNameType,
        featureState: item.wholeStyle[
          feature as FeatureNameType
        ] as FeatureState,
      });
    }
    const compare = getCompareMap(beforeMap, map, containerRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      compare.remove();
    };
  }, [logId]);

  const comparisonButtonClickHandler = (newLogId: string) => {
    if (newLogId === logId) {
      setLogId(undefined);
      return;
    }
    setLogId(newLogId);
  };

  return {
    logId,
    setLogId,
    comparisonButtonClickHandler,
  };
}

export default useCompareFeature;
