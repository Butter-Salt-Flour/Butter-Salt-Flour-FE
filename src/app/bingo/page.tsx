'use client';

import { Icon } from '@/components/Icon';
import React from 'react';

const bingoItems = [
  '전화로 안부인사 드리기',
  '30분 이상 산책하기',
  '함께 식사하기',
  'MBTI 검사하기',
  '오늘 고마웠던 순간, 소소한 이야기 웹에 올리기',
  '지역행사 참여하기',
  '청소 도와드리기',
  '디지털 앨범 만들기',
  '릴스 찍기',
];

const BingoPage = () => {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* 1. 상단 프로필 */}
      <section className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <h2 className="text-2xl font-bold">OOO 할머니</h2>
            <p className="text-sm text-gray-500">64세 여성</p>
          </div>
        </div>
        <button className=" flex text-xl text-gray-400  hover:text-gray-600 ">
          챌린지 기간 설정하기
          <span className="mr-3"></span>
          <Icon src="/date.svg" name="camera" size={24} />
        </button>
      </section>

      <section className="mb-20">
        <p className="text-green-700 font-semibold border border-green-300 px-4 py-2 rounded-md inline-block bg-green-50 text-base">
          ✅ 할매랑 챌린지 깨자~!{' '}
          <span className="text-sm ml-2 text-gray-500">
            한 줄 이상 빙고를 완성해주세요!
          </span>
        </p>
      </section>

      {/* 3. 빙고 타일 */}
      <section className="grid grid-cols-3 gap-6">
        {bingoItems.map((label, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center text-center rounded-xl border border-gray-300 bg-white p-6 text-lg font-medium min-h-[220px] hover:shadow-md transition"
          >
            <p className="mb-2">{label}</p>

            {/* 숨겨진 파일 input */}
            <input
              type="file"
              id={`file-upload-${i}`}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log(`업로드된 파일(${label}):`, file);
                  // TODO: 백엔드 전송 or 상태 업데이트 로직 추가
                }
              }}
            />

            {/* 라벨로 버튼 연결 */}
            <label
              htmlFor={`file-upload-${i}`}
              className="absolute bottom-4 right-4 opacity-50 hover:opacity-80 transition cursor-pointer"
            >
              <Icon src="/camera.svg" name="camera" size={24} />
            </label>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BingoPage;
