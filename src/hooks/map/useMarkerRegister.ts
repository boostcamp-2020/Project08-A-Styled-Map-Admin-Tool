import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import getRandomId from '../../utils/getRandomId';
import {
  deleteMarkerOfLocalStorage,
  updateMarkerOfLocalStorage,
  setNewMarkerToLocalStorage,
} from '../../utils/updateMarkerStorage';
import {
  addMarker,
  updateMarker,
  removeMarker,
  MarkerInstanceType,
} from '../../store/marker/action';
import { MarkerLngLatType } from './useMarkerFeature';
import { RootState } from '../../store';
import { ReduxStateType, URLPathNameType } from '../../store/common/type';

export interface RegisterMarkerType {
  id?: string;
  text: string;
  lngLat?: MarkerLngLatType;
  instance?: mapboxgl.Marker;
}

export interface MarkerRegisterHookType {
  registerMarker: ({ text, lngLat }: RegisterMarkerType) => void;
}

const LIMIT_MARKER_NUMBER = 30;
const { pathname } = window.location;

function useMarkerRegister(): MarkerRegisterHookType {
  const dispatch = useDispatch();
  const { map, marker } = useSelector<RootState>((state) => ({
    map: state.map.map,
    marker: state.marker,
  })) as ReduxStateType;

  const registerMarker = ({
    id = getRandomId(8),
    text,
    lngLat,
    instance,
  }: RegisterMarkerType): void => {
    if (!map) return;
    if (!lngLat?.lng || !lngLat?.lat) return;
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

    if (marker.length >= LIMIT_MARKER_NUMBER) {
      // eslint-disable-next-line no-alert
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

  return {
    registerMarker,
  };
}

export default useMarkerRegister;
