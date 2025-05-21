'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface MapProps {
  lat: number;
  lng: number;
  level?: number;
}

const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const Map = ({ lat, lng, level = 10 }: MapProps) => {
  useEffect(() => {
    if (!clientId) {
      console.error('Naver Map Client ID missing');
      return;
    }

    if (document.getElementById('naver-map-sdk')) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-map-sdk';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;

    script.onload = () => {
      initMap();
    };

    document.head.appendChild(script);

    function initMap() {
      const container = document.getElementById('map');
      if (!container) {
        console.error('Map container not found');
        return;
      }

      new window.naver.maps.Map(container, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: level,
      });
    }
  }, [lat, lng, level]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
