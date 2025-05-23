"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Spinner } from "basic-loading";

interface GoogleMapProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  enableMasking?: boolean;
  onMarkerClick?: (position: { lat: number; lng: number }) => void;
  onMapClick?: (position: { lat: number; lng: number }) => void;
}

const GoogleMap = ({
  address,
  latitude,
  longitude,
  radius = 2000,
  enableMasking = false,
  onMarkerClick,
  onMapClick,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLocation, setMapLocation] = useState<google.maps.LatLng | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const option = {
    size: 40,
    bgColor: "#3B82F6",
    barColor: "#BAD5E8",
    thickness: 5,
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setError("Google Maps API 키가 설정되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader
      .load()
      .then(() => {
        if (latitude && longitude) {
          setMapLocation(new google.maps.LatLng(latitude, longitude));
          setIsLoading(false);
        } else if (address) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: address }, (results, status) => {
            if (results) {
              if (status === "OK") {
                setMapLocation(results[0].geometry.location);
                setIsLoading(false);
              } else {
                setError(`주소를 찾을 수 없습니다: ${status}`);
                setIsLoading(false);
              }
            }
          });
        } else {
          setError("주소 또는 위도/경도가 필요합니다.");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Google Maps 로딩 중 오류가 발생했습니다.");
        setIsLoading(false);
        console.error(err);
      });
  }, [address, latitude, longitude]);

  useEffect(() => {
    if (!mapLocation || !mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: mapLocation,
      zoom: 13,
      styles: enableMasking
        ? [
            {
              featureType: "all",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
          ]
        : [],
    });

    setMap(newMap);

    const marker = new google.maps.Marker({
      map: newMap,
      position: mapLocation,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    // 마커 클릭 이벤트 추가
    if (onMarkerClick) {
      marker.addListener("click", () => {
        onMarkerClick({
          lat: mapLocation.lat(),
          lng: mapLocation.lng(),
        });
      });
    }

    // 지도 클릭 이벤트 추가
    if (onMapClick) {
      newMap.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          onMapClick({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }
      });
    }

    // 반경 원 생성 (마스킹이 활성화된 경우에만)
    if (enableMasking) {
      const circle = new google.maps.Circle({
        map: newMap,
        center: mapLocation,
        radius: radius,
        fillColor: "#4285F4",
        fillOpacity: 0,
        strokeColor: "#4285F4",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      newMap.setOptions({
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      });

      newMap.fitBounds(circle.getBounds()!);
    }
  }, [mapLocation, radius, enableMasking, onMarkerClick, onMapClick]);

  if (error) {
    return (
      <div className="min-h-[20rem] minh-w-[60rem] border border-red-400 p-4 rounded text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[20rem] border-gray-400 p-3 rounded flex justify-center items-center">
        <Spinner option={option} />
      </div>
    );
  }

  return (
    <div
      className="min-h-[30rem] min-w-[20rem] border-gray-400 p-2 rounded relative"
      ref={mapRef}
    />
  );
};

export default GoogleMap;
