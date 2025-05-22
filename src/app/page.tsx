import React from "react";
import { Spinner } from "basic-loading";

export default function App() {
  const option = {
    size: 40, // string 타입 주의! 숫자가 아니라 "50"
    bgColor: "#3B82F6", // 파란색
    barColor: "#BAD5E8", // 흰색
    thickness: 5,
  };

  return <Spinner option={option} />;
}
