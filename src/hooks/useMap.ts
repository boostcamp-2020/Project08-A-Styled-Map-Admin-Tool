import { RefObject, useState, useRef, useEffect } from 'react';
import dotenv from 'dotenv';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

export interface MapHookType {
  mapRef: RefObject<HTMLDivElement>;
  plusZoom: () => void;
  minusZoom: () => void;
  fullscreenHandler: () => void;
  smallscreenHandler: () => void;
}

function useMap(): MapHookType {
  const [lng, setLng] = useState<number>(128);
  const [lat, setLat] = useState<number>(36.5);
  const [zoom, setZoom] = useState<number>(7);
  /** 나중에 상태관리로 빠져야 함 */
  const [mapState, setMapState] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-right'
    );

    map.on('move', () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    setMapState(map);
  }, []);

  const plusZoom = () => {
    mapState.flyTo({ zoom: zoom + 1 });
    setZoom(zoom + 1);
  };

  const minusZoom = () => {
    mapState.flyTo({ zoom: zoom - 1 });
    setZoom(zoom - 1);
  };

  const fullscreenHandler = () => {
    if (mapRef.current) {
      mapRef.current.requestFullscreen();
    }
  };

  const smallscreenHandler = () => {
    if (window.document.fullscreenElement) {
      window.document.exitFullscreen();
    }
  };

  return {
    mapRef,
    plusZoom,
    minusZoom,
    fullscreenHandler,
    smallscreenHandler,
  };
}

export default useMap;
