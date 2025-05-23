"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Title1, Title3 } from "@/components/Typography";
import { InputField } from "@/components/Input/InputField";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/Button";
import { fetchYouthInfo } from "@/lib/apis/main";

export default function Page() {
  const { name: authName, token } = useAuthStore();
  const [youthInfo, setYouthInfo] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    residency: "",
    volunteerHours: "",
  });

  useEffect(() => {
    const getYouthInfo = async () => {
      if (token) {
        try {
          const data = await fetchYouthInfo(token);
          setYouthInfo({
            name: data.name,
            age: data.age ? String(data.age) : "",
            phoneNumber: data.phoneNumber,
            residency: "", // Assuming residency is not in the API response, leave empty or handle accordingly
            volunteerHours: "", // Assuming volunteerHours is not in the API response, leave empty or handle accordingly
          });
        } catch (error) {
          console.error("Failed to fetch youth info:", error);
        }
      }
    };

    getYouthInfo();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setYouthInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="flex flex-col w-full py-12 px-20">
      <div className="flex align-middle items-center justify-between">
        <div className="flex align-middle items-center gap-3 py-4">
          <Image
            className="rounded-full"
            src="/손녀.png"
            alt="Profile"
            width={60}
            height={60}
          />

          <Title1>{authName}</Title1>
        </div>
        <Button variant="yes" className="font-semibold h-12">
          마이페이지
        </Button>
      </div>

      <form className="flex flex-col gap-6 px-3 w-full">
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-5">
              <Title3 className="whitespace-nowrap">이름</Title3>
              <InputField
                variant="primary"
                placeholder="이름을 입력해 주세요"
                name="name"
                value={youthInfo.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between items-center gap-5">
              <Title3 className="whitespace-nowrap">나이</Title3>
              <InputField
                variant="primary"
                placeholder="나이를 입력해주세요"
                name="age"
                value={youthInfo.age}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-5">
              <Title3 className="whitespace-nowrap">전화번호</Title3>
              <InputField
                variant="primary"
                placeholder="전화번호를 입력해주세요"
                name="phoneNumber"
                value={youthInfo.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between items-center gap-5">
              <Title3 className="whitespace-nowrap">거주지</Title3>
              <InputField
                variant="primary"
                placeholder="거주지를 입력해주세요"
                className="w-full"
                name="residency"
                value={youthInfo.residency}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-5">
          <Title3 className="whitespace-nowrap ">봉사시간</Title3>
          <InputField
            variant="primary"
            placeholder="봉사시간을 입력해주세요"
            className="w-full"
            name="volunteerHours"
            value={youthInfo.volunteerHours}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
