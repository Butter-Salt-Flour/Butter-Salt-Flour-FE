"use client";
import React, { useState, useEffect } from "react";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import { Button } from "@/components/Button";
import { Ellipse } from "@/assets/Icons";
import { Icon } from "@/components/Icon";
import { Subtitle1, Subtitle2, Title1 } from "@/components/Typography";
import { Modal } from "@/components/Modal";
import Form from "@/components/ui/Form";

interface SeniorProfile {
  senior_id: string;
  name: string;
  gender: string;
  phone_number: string;
  address: string;
  age: number;
  profileImage: string;
  description: string;
  latitude: string;
  longtitude: string;
}

export default function Page() {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isShow, setIsShow] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsShow(false);
    setIsFormOpen(true);
  };

  const SeniorInformation = ({}: { enableMasking: boolean }) => {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-2 z-20  w-fit bg-white rounded-3xl justify-center p-5 px-6">
          <div className="flex gap-4 items-center">
            <Icon src={Ellipse} size={60} />
            <div>
              <Subtitle2>{senior1.description}</Subtitle2>
              <Subtitle2 className="text-gray-500">신청인원 2/3</Subtitle2>
            </div>
          </div>

          {/* {enableMasking ? (
            <>
              <div>연락처: {senior1.phone_number}</div>
              <div>주소: {senior1.address}</div>
            </>
          ) : (
            <>
              <div>연락처: ***-****-****</div>
              <div>주소: ********</div>
            </>
          )} */}

          <div className="flex whitespace-nowrap w-full py-2 justify-evenly">
            <Button
              label="아니요"
              variant="secondary"
              onClick={() => setIsShow(false)}
              size="sm"
            />
            <Button
              label="할래요!"
              variant="primary"
              size="sm"
              onClick={handleOpenForm}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleMarkerClick = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({ latitude, longitude });
        },
        function (error) {
          setLocationError(`위치 정보 오류: ${error.message}`);
        }
      );
    } else {
      setLocationError("Geolocation API 지원 안 함");
    }
  }, []);

  const senior1: SeniorProfile = {
    senior_id: "12345",
    name: "김말숙",
    gender: "Male",
    phone_number: "010-2332-2312",
    address: "서울특별시 강남구 테헤란로 122",
    age: 91,
    profileImage: "https://example.com/images/김말숙.jpg",
    description: "난 아직도 어리다... 🌸.",
    latitude: "37.54419744589",
    longtitude: "126.95121385337",
  };
  // 할머니 포커스 돼 있고 클릭시 할머니 정보
  // 내 주소 찾아서 왔다갔다가
  // 여러 할머니중에 가장 가까운 할머니

  return (
    <div className="flex flex-col w-full py-12 px-20">
      <div className="flex align-middle items-center gap-2">
        <Icon src={Ellipse} size={60} />
        <Title1>프로필</Title1>
      </div>

      <div className="py-4">
        <Title1>할매야놀자~!</Title1>
        <Subtitle1>함께하고 싶은 할머니를 선택해주세요!</Subtitle1>
      </div>

      <div className="relative">
        {isShow && <SeniorInformation enableMasking={true} />}
        <GoogleMap
          address={senior1.address}
          latitude={currentLocation?.latitude}
          longitude={currentLocation?.longitude}
          radius={2000}
          enableMasking={true}
          onMarkerClick={handleMarkerClick}
        />
      </div>
      <div className="flex w-full justify-end">
        {currentLocation ? (
          <div>
            현재 위치: 위도 {currentLocation.latitude.toFixed(6)}, 경도{" "}
            {currentLocation.longitude.toFixed(6)}
          </div>
        ) : locationError ? (
          <div className="text-red-500">{locationError}</div>
        ) : (
          <div>위치 정보를 가져오는 중...</div>
        )}
      </div>

      <Modal isOpen={isFormOpen} closeModal={() => setIsFormOpen(false)}>
        <div className="p-6">
          <Form isShow={isFormOpen} setIsShow={setIsFormOpen} />
        </div>
      </Modal>
    </div>
  );
}
