import React, { useState, useRef, useEffect } from 'react';
import dotenv from 'dotenv';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapPresenter from './MapPresenter';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN as string;

function MapContainer(): React.ReactElement {
  const [lng, setLng] = useState<number>(128);
  const [lat, setLat] = useState<number>(36.5);
  const [zoom, setZoom] = useState<number>(7);
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
  }, []);

  return <MapPresenter mapRef={mapRef} />;
}

export default MapContainer;
