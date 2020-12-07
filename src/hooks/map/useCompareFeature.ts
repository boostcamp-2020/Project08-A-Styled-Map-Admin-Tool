import { useState, RefObject, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import getCompareMap from './getCompareMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface mapProps {
  container: string | HTMLElement;
  [key: string]: string | HTMLElement;
}

export type comparisonButtonClickHandlerType = (
  afterMapProps?: mapProps,
  beforeMapProps?: mapProps
) => void;

export interface useComparisonButtonType {
  isCompareActive: boolean;
  comparisonButtonClickHandler: comparisonButtonClickHandlerType;
}

export interface useCompareFeatureProps {
  containerRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}

function useCompareFeature({
  containerRef,
  beforeMapRef,
}: useCompareFeatureProps): useComparisonButtonType {
  const [isCompareActive, setIsCompareActive] = useState(false);
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  useEffect(() => {
    if (!isCompareActive) return;

    const beforeMap = new mapboxgl.Map({
      container: beforeMapRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom: map.getZoom(),
    });

    const compare = getCompareMap(beforeMap, map, containerRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      compare.remove();
    };
  }, [isCompareActive]);

  const comparisonButtonClickHandler = (
    afterMapProps?: mapProps,
    beforeMapProps?: mapProps
  ) => {
    setIsCompareActive(!isCompareActive);
  };

  return {
    isCompareActive,
    comparisonButtonClickHandler,
  };
}

export default useCompareFeature;
