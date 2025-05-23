'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import api from '@/lib/apis/instance';
import { Button } from '@/components/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  // 예시: 클릭 시 toggle
  const handleTileClick = (index: number) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  useEffect(() => {
    setTimeout(() => {
      const dummyRows = [1, 2, 3];
      setCompletedRows(dummyRows);
      if (dummyRows.length >= 3) {
        setIsCompleteModalOpen(true);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVolunteerModalOpen(true);
    }, 3000);
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <section className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <h2 className="text-2xl font-bold">OOO 할머니</h2>
            <p className="text-sm text-gray-500">64세 여성</p>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black border border-gray-300 rounded-md px-4 py-2">
              <CalendarIcon className="w-4 h-4" />
              {selectedDate
                ? format(selectedDate, 'PPP', { locale: ko })
                : '챌린지 기간 설정하기'}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </section>

      {/* 챌린지 배너 */}
      <section className="mb-20">
        <div className="text-amber-500 font-bold border-2 border-amber-400 px-6 py-4 rounded-xl inline-block bg-amber-50 text-xl shadow-md">
          할매랑 챌린지 깨자~!
          <span className="block text-base mt-2 text-gray-600">
            한 줄 이상 빙고를 완성해주세요!
          </span>
        </div>
      </section>

      {/* 빙고 타일 */}
      <section className="grid grid-cols-3 gap-6 mb-16 bg-orange-50 p-4 rounded-xl">
        {bingoItems.map((label, i) => {
          const isActive = activeIndexes.includes(i);
          const isDisabled = i === 5 || i === 8; // 예시로 비활성화 항목 (하얘질거임) (완료환거임)

          return (
            <div
              key={i}
              onClick={() => !isDisabled && handleTileClick(i)}
              className={`
          relative flex flex-col items-center justify-center text-center rounded-xl p-6 min-h-[220px] transition cursor-pointer 
          ${
            isActive
              ? 'border-2 border-amber-500 bg-white font-bold text-black'
              : ''
          }
          ${
            !isActive && !isDisabled
              ? 'border border-amber-300 bg-white text-gray-800'
              : ''
          }
          ${
            isDisabled
              ? 'border border-amber-100 bg-amber-50 text-gray-400 pointer-events-none'
              : ''
          }
        `}
            >
              <p className="mb-2">{label}</p>
              <input type="file" id={`file-upload-${i}`} className="hidden" />
              <label
                htmlFor={`file-upload-${i}`}
                className={`
            absolute bottom-4 right-4 transition 
            ${isDisabled ? 'opacity-20' : 'opacity-50 hover:opacity-80'}
            cursor-pointer
          `}
              >
                <Icon src="/camera.svg" name="camera" size={24} />
              </label>
            </div>
          );
        })}
      </section>

      {/* 빙고 제출 버튼 */}
      <div className="flex flex-col items-center justify-center mt-6">
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition">
          빙고 제출하기
        </button>
        <p className="text-xs  text-gray-500 mt-4 text-center">
          한 줄 완료 시, 뱃지 증정 / 세 줄 모두 완료 시, 봉사 시간 부여
        </p>
      </div>

      {/* 빙고 완성 모달 */}
      <Modal
        isOpen={isCompleteModalOpen}
        closeModal={() => setIsCompleteModalOpen(false)}
      >
        <div className="w-[400px] p-10 text-center border-4 border-amber-400 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">3줄 이상 완성!</h2>
          <p className="text-gray-500 text-sm mb-6">
            뱃지는 마이페이지에서 확인 가능합니다.
          </p>
          <Button variant="no" onClick={() => setIsCompleteModalOpen(false)}>
            닫기
          </Button>
        </div>
      </Modal>

      {/* 봉사시간 신청 모달 */}
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
