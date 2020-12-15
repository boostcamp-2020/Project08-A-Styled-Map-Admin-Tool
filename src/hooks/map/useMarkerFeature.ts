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
  MarkerInstanceType,
  MARKER,
} from '../../store/marker/action';
import { URLPathNameType } from '../../store/common/type';

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

const initMarkerStateXY = {
  x: null,
  y: null,
};

const initMarkerStateLngLat = {
  lng: null,
  lat: null,
};

const initialLocalStorageMarkers: MarkerInstanceType[] = [];

const getMarkersFromLocalStorage = (): MarkerInstanceType[] => {
  return JSON.parse(localStorage.getItem(MARKER) as string);
};

const setMarkersToLocalStorage = (markers: MarkerInstanceType[]): void => {
  localStorage.setItem(MARKER, JSON.stringify(markers));
};

export function getInitialMarkersFromLocalStorage(): MarkerInstanceType[] {
  const storedMarkers = getMarkersFromLocalStorage();

  if (!storedMarkers) return initialLocalStorageMarkers;

  const newState = storedMarkers.reduce(
    (
      acc: MarkerInstanceType[],
      marker: MarkerInstanceType
    ): MarkerInstanceType[] => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${marker.text}</p>`));
      acc.push({ ...marker, instance: newMarker });
      return acc;
    },
    []
  );

  return newState;
}

export function setNewMarkerToLocalStorage({
  id,
  text,
  lng,
  lat,
}: MarkerInstanceType): void {
  const storedMarker = getMarkersFromLocalStorage();
  const markerArray = storedMarker ?? [];

  markerArray.push({
    id,
    text,
    lng,
    lat,
  });

  setMarkersToLocalStorage(markerArray);
}

function updateMarkerOfLocalStorage({
  id,
  lng,
  lat,
}: MarkerInstanceType): void {
  const storedMarkers = getMarkersFromLocalStorage();
  const changedMarkers = storedMarkers.map((marker) => {
    const targetMarker =
      marker.id === id
        ? { ...marker, lng: lng ?? marker.lng, lat: lat ?? marker.lat }
        : marker;
    return targetMarker;
  });

  setMarkersToLocalStorage(changedMarkers);
}

function deleteMarkerOfLocalStorage(id: string) {
  const storedMarkers = getMarkersFromLocalStorage();
  const targetMarker = storedMarkers.find((marker) => marker.id === id);
  targetMarker?.instance?.remove();
  const changedMarkers = storedMarkers.filter((marker) => marker.id !== id);
  setMarkersToLocalStorage(changedMarkers);
}

const { pathname } = window.location;

function useMarkerFeature(): MarkerHookType {
  const dispatch = useDispatch();
  const { map, marker } = useSelector<RootState>((state) => ({
    map: state.map.map,
    marker: state.marker,
  })) as ReduxStateType;

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

  const registerMarker = ({
    id = getRandomId(8),
    text,
    lngLat = markerLngLat,
    instance,
  }: RegisterMarkerType): void => {
    if (!map) return;
    if (!lngLat.lng || !lngLat.lat) return;
    const { lng, lat } = lngLat;

    /** 새로고침 할 때 */
    if (instance) {
      instance.getElement().addEventListener('contextmenu', (e) => {
        e.stopPropagation();
        e.preventDefault();
        instance.remove();
        dispatch(removeMarker(id));
        deleteMarkerOfLocalStorage(id);
      });
      instance.addTo(map);
      instance.on('dragend', () => {
        if (pathname === URLPathNameType.show) return;
        const lnglat = instance.getLngLat();
        const changedData = { id, text, lng: lnglat.lng, lat: lnglat.lat };
        dispatch(updateMarker(changedData));
        updateMarkerOfLocalStorage(changedData);
      });
      return;
    }

    if (marker.markers.length >= LIMIT_MARKER_NUMBER) {
      alert(`최대 ${LIMIT_MARKER_NUMBER}개의 marker만 등록할 수 있습니다.`);
      return;
    }
    const newMarker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${text}</p>`))
      .addTo(map);

    newMarker.on('dragend', () => {
      if (pathname === URLPathNameType.show) return;
      const lnglat = newMarker.getLngLat();
      const updateInfo = {
        id,
        text,
        lng: lnglat.lng,
        lat: lnglat.lat,
      };
      dispatch(updateMarker(updateInfo));
      updateMarkerOfLocalStorage(updateInfo);
    });

    newMarker.getElement().addEventListener('contextmenu', (e) => {
      if (pathname === URLPathNameType.show) return;
      e.stopPropagation();
      e.preventDefault();
      newMarker.remove();

      dispatch(removeMarker(id));
      deleteMarkerOfLocalStorage(id);
    });

    // 새로운 마커 추가
    const newMarkerInstance: MarkerInstanceType = {
      id,
      text,
      lng,
      lat,
      instance: newMarker,
    };
    dispatch(addMarker(newMarkerInstance));
    if (pathname !== URLPathNameType.show)
      setNewMarkerToLocalStorage(newMarkerInstance);
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
    registerMarker,
  };
}

export default useMarkerFeature;
