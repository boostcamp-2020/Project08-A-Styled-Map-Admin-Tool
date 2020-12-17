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
import { MarkerLngLatType } from './useMarkerPosition';
import { RootState } from '../../store';
import { ReduxStateType, URLPathNameType } from '../../store/common/type';

export interface RegisterMarkerType {
  id?: string;
  text: string;
  lngLat?: MarkerLngLatType;
  instance?: mapboxgl.Marker;
}

export interface MarkerRegisterHookType {
  marker: MarkerInstanceType[];
  addInstanceToMap: ({ id, text, instance }: AddInstanceToMapProps) => void;
  registerMarker: ({ text, lngLat }: RegisterMarkerType) => void;
}

const LIMIT_MARKER_NUMBER = 30;
const { pathname } = window.location;

interface AddInstanceToMapProps {
  id: string;
  text: string;
  instance: mapboxgl.Marker;
}

function useMarkerRegister(): MarkerRegisterHookType {
  const dispatch = useDispatch();
  const { map, marker } = useSelector<RootState>((state) => ({
    map: state.map.map,
    marker: state.marker.markers,
  })) as ReduxStateType;

  const addInstanceToMap = ({ id, text, instance }: AddInstanceToMapProps) => {
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
      const { lng, lat } = instance.getLngLat();
      const changedData = { id, text, lng, lat };
      dispatch(updateMarker(changedData));
      updateMarkerOfLocalStorage(changedData);
    });
  };

  const registerMarker = ({
    id = getRandomId(8),
    text,
    lngLat,
    instance,
  }: RegisterMarkerType): void => {
    if (!map || !marker) return;
    if (!lngLat?.lng || !lngLat?.lat) return;
    const { lng, lat } = lngLat;

    /** 새로고침 할 때 */
    if (instance) {
      addInstanceToMap({ instance, id, text });
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

    addInstanceToMap({ id, text, instance: newMarker });

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
    marker,
    addInstanceToMap,
    registerMarker,
  };
}

export default useMarkerRegister;
