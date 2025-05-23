'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button'; // 버튼 컴포넌트 사용 시 필요

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
  const [completedRows, setCompletedRows] = useState<number[]>([]);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  // ✅ 빙고 완료 모달 (3줄 이상)
  useEffect(() => {
    setTimeout(() => {
      const dummyRows = [1, 2, 3];
      setCompletedRows(dummyRows);
      if (dummyRows.length >= 3) {
        setIsCompleteModalOpen(true);
      }
    }, 1000);
  }, []);

  // ✅ 봉사시간 신청 모달
  useEffect(() => {
    setTimeout(() => {
      setIsVolunteerModalOpen(true);
    }, 3000);
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* 프로필 영역 */}
      <section className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <h2 className="text-2xl font-bold">OOO 할머니</h2>
            <p className="text-sm text-gray-500">64세 여성</p>
          </div>
        </div>
        <button className="flex text-xl text-gray-400 hover:text-gray-600">
          챌린지 기간 설정하기
          <span className="mr-3" />
          <Icon src="/date.svg" name="calendar" size={24} />
        </button>
      </section>

      {/* 배너 */}
      <section className="mb-20">
        <p className="text-green-700 font-semibold border border-green-300 px-4 py-2 rounded-md inline-block bg-green-50 text-base">
          ✅ 할매랑 챌린지 깨자~!
          <span className="text-sm ml-2 text-gray-500">
            한 줄 이상 빙고를 완성해주세요!
          </span>
        </p>
      </section>

      {/* 빙고 타일 */}
      <section className="grid grid-cols-3 gap-6">
        {bingoItems.map((label, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center text-center rounded-xl border border-gray-300 bg-white p-6 text-lg font-medium min-h-[220px] hover:shadow-md transition"
          >
            <p className="mb-2">{label}</p>
            <input type="file" id={`file-upload-${i}`} className="hidden" />
            <label
              htmlFor={`file-upload-${i}`}
              className="absolute bottom-4 right-4 opacity-50 hover:opacity-80 transition cursor-pointer"
            >
              <Icon src="/camera.svg" name="camera" size={24} />
            </label>
          </div>
        ))}
      </section>

      {/* ✅ 1. 빙고 완성 모달 */}
      <Modal
        isOpen={isCompleteModalOpen}
        closeModal={() => setIsCompleteModalOpen(false)}
      >
        <div className="w-[400px] p-10 text-center border-4 border-blue-400 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">3줄 이상 완성!</h2>
          <p className="text-gray-500 text-sm mb-6">
            뱃지는 마이페이지에서 확인 가능합니다.
          </p>
          <Button variant="no" onClick={() => setIsCompleteModalOpen(false)}>
            닫기
          </Button>
        </div>
      </Modal>

      {/* ✅ 2. 봉사시간 신청 모달 */}
      <Modal
        isOpen={isVolunteerModalOpen}
        closeModal={() => setIsVolunteerModalOpen(false)}
      >
        <div className="w-[440px] p-10 rounded-xl bg-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">봉사시간 신청</h2>
          <p className="text-gray-500 text-sm mb-6">
            봉사시간 부여를 위한 정보를 입력해 주세요!
          </p>
          <form className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-16 text-sm font-semibold text-left">
                이름
              </label>
              <input
                type="text"
                placeholder="이름을 입력해 주세요"
                className="flex-1 px-4 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-16 text-sm font-semibold text-left">
                아이디
              </label>
              <input
                type="text"
                placeholder="1365 아이디를 입력해 주세요"
                className="flex-1 px-4 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                variant="no"
                onClick={() => setIsVolunteerModalOpen(false)}
              >
                취소
              </Button>
              <Button variant="yes" onClick={() => alert('신청 완료')}>
                신청하기
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </main>
  );
};

export default BingoPage;
