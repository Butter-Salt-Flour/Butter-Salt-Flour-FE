"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Subtitle1, Subtitle2, Title1, Title2 } from "@/components/Typography";
import { Modal } from "@/components/Modal";
import Form from "@/components/ui/Form";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchAllSeniors } from "@/lib/apis/main";

interface SeniorProfile {
  seniorId: number;
  name: string;
  gender?: string;
  phone_number?: string;
  address: string;
  age: number;
  profileImage: string;
  description: string;
  latitude: number;
  longitude: number;
}

export default function Page() {
  const { imgUrl, name } = useAuthStore();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [closestSenior, setClosestSenior] = useState<SeniorProfile | null>(
    null
  );

  const handleOpenForm = () => {
    setIsShow(false);
    setIsFormOpen(true);
  };

  const calculateSquaredDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const dx = lat1 - lat2;
    const dy = lon1 - lon2;
    return dx * dx + dy * dy;
  };

  useEffect(() => {
    fetchAllSeniors()
      .then((data) => {
        setSeniors(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (currentLocation && seniors.length > 0) {
      let minDistance = Infinity;
      let closest: SeniorProfile | null = null;

      seniors.forEach((senior) => {
        if (senior.latitude !== undefined && senior.longitude !== undefined) {
          const distance = calculateSquaredDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            senior.latitude,
            senior.longitude
          );
          if (distance < minDistance) {
            minDistance = distance;
            closest = senior;
          }
        }
      });
      setClosestSenior(closest);
    }
  }, [currentLocation, seniors]);

  console.log(seniors, "ㅋㅋㅋ");
  console.log(closestSenior, "가장 가까운 할머니", closestSenior?.longitude);

  const SeniorInformation = ({ enableMasking }: { enableMasking: boolean }) => {
    if (!closestSenior) return null;

    return (
      <div className="absolute top-1/2 left-2/6 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
        <div className="flex flex-col gap-2 z-20 shadow w-fit bg-white rounded-3xl justify-center p-5 px-6">
          <div className="flex gap-6 items-center">
            <Icon src={"/grp.PNG"} size={100} />
            <div>
              <Subtitle1>{closestSenior.description}</Subtitle1>{" "}
              <Subtitle2>{closestSenior.age}세 여성</Subtitle2>
              <Subtitle2 className="text-gray-500">신청인원 2/3</Subtitle2>
            </div>
          </div>

          {enableMasking ? (
            <></>
          ) : (
            <>
              <div>연락처: ***-****-****</div>
              <div>주소: ********</div>
            </>
          )}

          <div className="flex whitespace-nowrap w-full py-2 justify-evenly gap-2">
            <Button
              variant="no"
              size="md"
              onClick={() => setIsShow(false)}
              className="px-5 font-semibold"
            >
              싫어유
            </Button>
            <Button
              variant="yes"
              size="md"
              className="px-12 font-semibold"
              onClick={handleOpenForm}
            >
              좋아유!
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
          console.error(`위치 정보 오류: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation API 지원 안 함");
    }
  }, []);

  return (
    <div className="flex flex-col w-full py-12 px-20">
      <div className="flex align-middle items-center gap-3 py-4">
        {imgUrl && (
          <Image
            className="rounded-full"
            src="/손녀.png"
            alt="Profile"
            width={60}
            height={60}
          />
        )}
        <Title1>{name}</Title1>
      </div>

      <div className="py-6 pt-8 items-center w-full justify-center flex flex-col bg-amber-50">
        <Title1 className="text-amber-500 text-center pb-1">
          할매야, 놀자~!
        </Title1>
        <Subtitle1 className="text-gray-400 text-center">
          할매랑 함께 놀고 싶은 사람, 손 들어봐라~!
        </Subtitle1>

        <div className="flex w-full justify-center pt-5">
          <Title2 className="text-amber-500">{seniors.length}명</Title2>
          <Title2>의 할머니가 근방에 있어요!</Title2>
        </div>
      </div>

      <div className="relative rounded-3xl">
        {isShow && <SeniorInformation enableMasking={true} />}
        <GoogleMap
          key={closestSenior?.seniorId}
          address={closestSenior?.address}
          latitude={closestSenior?.latitude}
          longitude={closestSenior?.longitude}
          radius={2000}
          enableMasking={true}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      <Modal isOpen={isFormOpen} closeModal={() => setIsFormOpen(false)}>
        <div className="p-6">
          <Form isShow={isFormOpen} setIsShow={setIsFormOpen} />
        </div>
      </Modal>
    </div>
  );
}
