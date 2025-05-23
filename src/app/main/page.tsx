"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import { Button } from "@/components/Button";
import { Ellipse } from "@/assets/Icons";
import { Icon } from "@/components/Icon";
import { Subtitle1, Subtitle2, Title1 } from "@/components/Typography";
import { Modal } from "@/components/Modal";
import Form from "@/components/ui/Form";
import { useAuthStore } from "@/store/useAuthStore";

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
  const { imgUrl, name } = useAuthStore();
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
      <div className="absolute top-1/2 left-2/6 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
        <div className="flex flex-col gap-2 z-20 shadow w-fit bg-white rounded-3xl justify-center p-5 px-6">
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

          <div className="flex whitespace-nowrap w-full py-2 justify-evenly gap-2">
            <Button
              variant="no"
              size="md"
              onClick={() => setIsShow(false)}
              className="px-5 font-semibold"
            >
              아니요
            </Button>
            <Button
              variant="yes"
              size="md"
              className="px-12 font-semibold"
              onClick={handleOpenForm}
            >
              할래요!
            </Button>
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
    description: "난 아직도 어리다... 👵🏻",
    latitude: "37.54419744589",
    longtitude: "126.95121385337",
  };
  // 할머니 포커스 돼 있고 클릭시 할머니 정보
  // 내 주소 찾아서 왔다갔다가
  // 여러 할머니중에 가장 가까운 할머니

  return (
    <div className="flex flex-col w-full py-12 px-20">
      <div className="flex align-middle items-center gap-2">
        {imgUrl && (
          <Image
            className="rounded-full"
            src={imgUrl}
            alt="Profile"
            width={44}
            height={44}
          />
        )}
        <Title1>{name}</Title1>
      </div>

      <div className="py-4 pt-5">
        <Title1>할매야, 놀자~!</Title1>
        <Subtitle1>할매랑 함께 놀고 싶은 사람, 손 들어봐라~!</Subtitle1>
      </div>

      <div className="relative py-12">
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
