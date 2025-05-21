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

    const initMap = () => {
      const container = document.getElementById('map');
      if (!container) {
        console.error('Map container not found');
        return;
      }

      if (!window.naver?.maps) {
        console.error('window.naver.maps not ready');
        return;
      }

      new window.naver.maps.Map(container, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: level,
      });
    };

    if (window.naver?.maps) {
      initMap();
      return;
    }

    // script가 이미 있으면 기다리기만 함
    if (document.getElementById('naver-map-sdk')) {
      const interval = setInterval(() => {
        if (window.naver?.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
      return;
    }

    // script 최초 삽입
    const script = document.createElement('script');
    script.id = 'naver-map-sdk';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  }, [lat, lng, level]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
