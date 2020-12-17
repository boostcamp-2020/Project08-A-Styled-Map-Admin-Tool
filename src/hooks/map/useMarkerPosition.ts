import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { URLPathNameType } from '../../store/common/type';

interface MarkerPosType {
  x: number | null;
  y: number | null;
}

export interface MarkerLngLatType {
  lng: number | null;
  lat: number | null;
}
export interface MarkerHookType {
  markerPosition: MarkerPosType;
  resetMarkerPos: () => void;
  markerLngLat: MarkerLngLatType;
}

const initMarkerStateXY = {
  x: null,
  y: null,
};
const initMarkerStateLngLat = {
  lng: null,
  lat: null,
};
const { pathname } = window.location;

function useMarkerFeature(): MarkerHookType {
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  const [markerPosition, setMarkerPos] = useState<MarkerPosType>({
    ...initMarkerStateXY,
  });
  const [markerLngLat, setMarkerLngLat] = useState<MarkerLngLatType>({
    ...initMarkerStateLngLat,
  });

  const resetMarkerPos = () => {
    setMarkerPos({ ...initMarkerStateXY });
    setMarkerLngLat({ ...initMarkerStateLngLat });
  };

  useEffect(() => {
    if (!map) return;
    if (pathname !== URLPathNameType.show) {
      map.on('contextmenu', (e) => {
        e.preventDefault();
        setMarkerPos({ ...e.point });
        setMarkerLngLat({ ...e.lngLat });
      });
    }
  }, [map]);

  return {
    markerPosition,
    resetMarkerPos,
    markerLngLat,
  };
}

export default useMarkerFeature;
