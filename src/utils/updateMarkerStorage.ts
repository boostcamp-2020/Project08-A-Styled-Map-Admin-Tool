import mapboxgl from 'mapbox-gl';
import { MarkerInstanceType, MARKER } from '../store/marker/action';

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

export function updateMarkerOfLocalStorage({
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

export function deleteMarkerOfLocalStorage(id: string): void {
  const storedMarkers = getMarkersFromLocalStorage();
  const targetMarker = storedMarkers.find((marker) => marker.id === id);
  targetMarker?.instance?.remove();
  const changedMarkers = storedMarkers.filter((marker) => marker.id !== id);
  setMarkersToLocalStorage(changedMarkers);
}
