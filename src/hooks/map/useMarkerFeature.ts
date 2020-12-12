import mapboxgl from 'mapbox-gl';
import getRandomId from '../../utils/getRandomId';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  MarkerState,
  addMarker,
  updateMarker,
  removeMarker,
} from '../../store/marker/action';

const LIMIT_MARKER_NUMBER = 30;
interface ReduxStateType {
  map: mapboxgl.Map;
  marker: MarkerState;
}

interface MarkerPosType {
  x: number | null;
  y: number | null;
}

export interface MarkerLngLatType {
  lng: number | null;
  lat: number | null;
}

export interface RegisterMarkerType {
  id?: string;
  text: string;
  lngLat?: MarkerLngLatType;
  instance?: mapboxgl.Marker;
}

export interface MarkerHookType {
  markerPosition: MarkerPosType;
  resetMarkerPos: () => void;
  registerMarker: ({ text, lngLat }: RegisterMarkerType) => void;
}

function useMarkerFeature(): MarkerHookType {
  const dispatch = useDispatch();
  const { map, marker } = useSelector<RootState>((state) => ({
    map: state.map.map,
    marker: state.marker,
  })) as ReduxStateType;

  const [markerPosition, setMarkerPos] = useState<MarkerPosType>({
    x: null,
    y: null,
  });

  const [markerLngLat, setMarkerLngLat] = useState<MarkerLngLatType>({
    lng: null,
    lat: null,
  });

  const resetMarkerPos = () => {
    setMarkerPos({
      x: null,
      y: null,
    });
    setMarkerLngLat({
      lng: null,
      lat: null,
    });
  };

  const registerMarker = ({
    id = getRandomId(8),
    text,
    lngLat = markerLngLat,
    instance,
  }: RegisterMarkerType): void => {
    if (!map || !marker) return;
    if (!lngLat.lng || !lngLat.lat) return;

    if (instance) {
      instance.on('dragend', () => {
        const lnglat = instance.getLngLat();
        dispatch(
          updateMarker({
            id,
            lng: lnglat.lng,
            lat: lnglat.lat,
          })
        );
      });

      instance.getElement().addEventListener('contextmenu', (e) => {
        e.stopPropagation();
        e.preventDefault();
        instance.remove();
        dispatch(removeMarker(id));
      });
      instance.addTo(map);
      return;
    }

    if (marker.markers.length >= LIMIT_MARKER_NUMBER) {
      alert(`최대 ${LIMIT_MARKER_NUMBER}개의 marker만 등록할 수 있습니다.`);
      return;
    }
    const newMarker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lngLat.lng, lngLat.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${text}</p>`))
      .addTo(map);

    newMarker.on('dragend', () => {
      const lnglat = newMarker.getLngLat();
      dispatch(
        updateMarker({
          id,
          lng: lnglat.lng,
          lat: lnglat.lat,
        })
      );
    });

    newMarker.getElement().addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      e.preventDefault();
      newMarker.remove();
      dispatch(removeMarker(id));
    });

    // 새로운 마커 추가
    dispatch(
      addMarker({
        id,
        text,
        lng: lngLat.lng,
        lat: lngLat.lat,
        instance: newMarker,
      })
    );
  };

  useEffect(() => {
    if (!map) return;
    map.on('contextmenu', (e) => {
      e.preventDefault();
      setMarkerPos({ ...e.point });
      setMarkerLngLat({ ...e.lngLat });
    });
  }, [map]);

  return {
    markerPosition,
    resetMarkerPos,
    registerMarker,
  };
}

export default useMarkerFeature;
