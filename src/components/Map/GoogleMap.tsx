"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Spinner } from "basic-loading";

const GoogleMap = ({ address }: { address: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLocation, setMapLocation] = useState<google.maps.LatLng | null>(
    null
  );

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
      })
      .catch((err) => {
        setError("Google Maps 로딩 중 오류가 발생했습니다.");
        setIsLoading(false);
        console.error(err);
      });
  }, [address]);

  useEffect(() => {
    if (!mapLocation || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: mapLocation,
      zoom: 13,
    });

    new google.maps.Marker({
      map: map,
      position: mapLocation,
    });
  }, [mapLocation]);

  if (error) {
    return (
      <div className="min-h-[20rem] minh-w-[60rem] border border-red-400 p-4 rounded text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[20rem] border-gray-400 p-4 rounded flex justify-center items-center">
        <Spinner option={option} />
      </div>
    );
  }

  return (
    <div
      className="min-h-[20rem] min-w-[20rem] border-gray-400 p-2 rounded"
      ref={mapRef}
    />
  );
};

export default GoogleMap;
