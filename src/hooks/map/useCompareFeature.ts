/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useState, RefObject, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import initLayers from '../../utils/rendering-data/layers/init';
import getCompareMap from './getCompareMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  HistoryPropsType,
  FeatureNameType,
  FeatureState,
} from '../../store/common/type';
import setFeatureStyle from '../../utils/setFeatureStyle';

export interface mapProps {
  container: string | HTMLElement;
  [key: string]: string | HTMLElement;
}

export interface useComparisonButtonType {
  logId: string | undefined;
  comparisonButtonClickHandler: (id: string) => void;
}

export interface useCompareFeatureProps {
  containerRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}

function useCompareFeature({
  containerRef,
  beforeMapRef,
}: useCompareFeatureProps): useComparisonButtonType {
  const [logId, setLogId] = useState<string>();
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const history = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  useEffect(() => {
    if (!logId) return;

    const beforeMap = new mapboxgl.Map({
      container: beforeMapRef.current as HTMLDivElement,
      style: initLayers as mapboxgl.Style,
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom: map.getZoom(),
    });

    beforeMap.on('load', () => {
      if (!history || !beforeMap) return;

      const [log] = history.log?.filter((log) => log.id === logId) || [];

      for (const feature in log.wholeStyle) {
        setFeatureStyle({
          map: beforeMap as mapboxgl.Map,
          feature: feature as FeatureNameType,
          featureState: log.wholeStyle[
            feature as FeatureNameType
          ] as FeatureState,
        });
      }
    });
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
    comparisonButtonClickHandler,
  };
}

export default useCompareFeature;
