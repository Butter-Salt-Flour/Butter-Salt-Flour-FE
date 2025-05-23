"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const option = {
    size: 40,
    bgColor: "#FFD700",
    barColor: "#FFB74D",
    thickness: 5,
  };

  const handleMarkerClick = useCallback(() => {
    if (mapLocation && onMarkerClick) {
      onMarkerClick({
        lat: mapLocation.lat(),
        lng: mapLocation.lng(),
      });
    }
  }, [mapLocation, onMarkerClick]);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng && onMapClick) {
        onMapClick({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }
    },
    [onMapClick]
  );

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
    if (!mapLocation || !mapRef.current || mapInstanceRef.current) return;

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
          ]
        : [],
    });

    mapInstanceRef.current = newMap;

    if (onMapClick) {
      newMap.addListener("click", handleMapClick);
    }
  }, [mapLocation, enableMasking, handleMapClick]);

  useEffect(() => {
    if (!mapLocation || !mapInstanceRef.current) return;

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const newMarker = new google.maps.Marker({
      map: mapInstanceRef.current,
      position: mapLocation,
      icon: {
        url: "/grp.PNG",
        scaledSize: new google.maps.Size(70, 75),
        anchor: new google.maps.Point(20, 40),
      },
    });

    if (onMarkerClick) {
      newMarker.addListener("click", handleMarkerClick);
    }

    markerRef.current = newMarker;

    if (enableMasking) {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      const newCircle = new google.maps.Circle({
        map: mapInstanceRef.current,
        center: mapLocation,
        radius: radius,
        fillColor: "#FFB74D",
        fillOpacity: 0.2,
        strokeColor: "#FF9800",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      circleRef.current = newCircle;
      mapInstanceRef.current.fitBounds(newCircle.getBounds()!);
    }
  }, [mapLocation, radius, enableMasking, handleMarkerClick]);

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
      className="min-h-[30rem] min-w-[20rem] border-gray-400 p-2 rounded-2xl shadow-xl relative"
      ref={mapRef}
    />
  );
};

export default GoogleMap;
