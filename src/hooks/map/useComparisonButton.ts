import { useState, useRef, RefObject } from 'react';
import mapboxgl, { MapboxOptions } from 'mapbox-gl';
import getCompareMap from './getCompareMap';

export interface mapProps {
  container: string | HTMLElement;
  [key: string]: string | HTMLElement;
}

export type comparisonButtonClickHandlerType = (
  afterMapProps?: mapProps,
  beforeMapProps?: mapProps
) => void;

export interface useComparisonButtonType {
  isComparisonToggle: boolean;
  afterMapRef: RefObject<HTMLDivElement>;
  comparisonMapRef: RefObject<HTMLDivElement>;
  comparisonButtonClickHandler: comparisonButtonClickHandlerType;
}

export interface ComparisonType {
  isComparisonToggle: boolean;
}

function useComparisonButton(
  mapRef: RefObject<HTMLDivElement>
): useComparisonButtonType {
  const [isComparisonToggle, setIsComparisonToggle] = useState(false);
  const afterMapRef = useRef<HTMLDivElement>(null);
  const comparisonMapRef = useRef<HTMLDivElement>(null);

  const comparisonButtonClickHandler = (
    afterMapProps?: mapProps,
    beforeMapProps?: mapProps
  ) => {
    if (!comparisonMapRef) return;
    setIsComparisonToggle(!isComparisonToggle);

    // FIXME: 데이터는 정상적으로 들어가지만, 화면에 표시 되지 않고 있음

    // if (isComparisonToggle === false) compareMap?.remove();

    // 더미데이터로 확인
    // const beforeMap = beforeMapProps
    //   ? new mapboxgl.Map(beforeMapProps as MapboxOptions)
    //   : new mapboxgl.Map({
    //       container: mapRef.current as HTMLDivElement,
    //       style: 'mapbox://styles/mapbox/streets-v11',
    //       center: [126.978, 37.5656],
    //       zoom: 15.5,
    //     });

    // const afterMap = afterMapProps
    //   ? new mapboxgl.Map(afterMapProps)
    //   : new mapboxgl.Map({
    //       container: afterMapRef.current as HTMLElement,
    //       style: 'mapbox://styles/mapbox/streets-v11',
    //       center: [126.978, 37.5656],
    //       zoom: 15.5,
    //     });

    // getCompareMap(beforeMap, afterMap, comparisonMapRef.current);

    // eslint-disable-next-line no-debugger
    // debugger;
  };

  return {
    isComparisonToggle,
    comparisonButtonClickHandler,
    afterMapRef,
    comparisonMapRef,
  };
}

export default useComparisonButton;
