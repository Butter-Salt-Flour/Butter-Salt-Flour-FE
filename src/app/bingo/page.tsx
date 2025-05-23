'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import toast from 'react-hot-toast';

const bingoItems = [
  { label: '전화로 안부인사 드리기', icon: '/1.svg' },
  { label: '30분 이상 산책하기', icon: '/2.svg' },
  { label: '함께 식사하기', icon: '/3.svg' },
  { label: 'MBTI 검사하기', icon: '/4.svg' },
  { label: '오늘 고마웠던 순간 웹에 올리기', icon: '/5.svg' },
  { label: '지역행사 참여하기', icon: '/6.svg' },
  { label: '청소 도와드리기', icon: '/7.svg' },
  { label: '디지털 앨범 만들기', icon: '/8.svg' },
  { label: '릴스 찍기', icon: '/9.svg' },
];

interface BingoPageProps {
  userName?: string;
  userAge?: number;
}

const BingoPage = ({ userName, userAge }: BingoPageProps) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [completedLines, setCompletedLines] = useState<number[][]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const router = useRouter();

  const bingoLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  useEffect(() => {
    const newCompleted = bingoLines.filter(
      (line) =>
        line.every((idx) => activeIndexes.includes(idx)) &&
        !completedLines.some(
          (completed) => completed.sort().toString() === line.sort().toString()
        )
    );

    if (newCompleted.length > 0) {
      setCompletedLines((prev) => [...prev, ...newCompleted]);
      setTimeout(() => setIsCompleteModalOpen(true), 500);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [activeIndexes]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    setTimeout(() => {
      setUploadingIndex(null);
      setActiveIndexes((prev) => [...new Set([...prev, index])]);
    }, 1000);
  };

  const handleRecord = () => {
    if (completedLines.length === 0) {
      toast.error('빙고를 한 줄 이상 완성해야 제출할 수 있어요!');
      return;
    }
    toast.success('제출을 성공했어요! 축하드려요!');
    setTimeout(() => router.push('/congrats'), 1000);
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <section className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <h2 className="text-2xl font-bold">{userName ?? 'OOO'} 할머니</h2>
            <p className="text-sm text-gray-500">{userAge ?? 64}세 여성</p>
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

      <section className="mb-20">
        <div className="text-amber-500 font-bold border-2 border-amber-400 px-6 py-4 rounded-xl inline-block bg-amber-50 text-xl shadow-md">
          할매랑 챌린지 깨자~!
          <span className="block text-base mt-2 text-gray-600">
            한 줄 이상 빙고를 완성해주세요!
          </span>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-6 mb-16 bg-orange-50 p-4 rounded-xl">
        {bingoItems.map((item, i) => {
          const isActive = activeIndexes.includes(i);
          const isCompleted = completedLines.some((line) => line.includes(i));

          return (
            <div
              key={i}
              className={`
                relative flex flex-col items-center justify-center text-center rounded-xl p-6 min-h-[220px] transition cursor-default
                ${
                  isCompleted
                    ? 'bg-green-100 border-4 border-green-500 text-green-900 font-bold line-through'
                    : isActive
                    ? 'border-2 border-amber-500 bg-white font-bold text-black'
                    : 'border border-amber-300 bg-white text-gray-800'
                }
              `}
            >
              <img src={item.icon} alt="" className="w-8 h-8 mb-2" />
              <p className="mb-2">{item.label}</p>
              <input
                type="file"
                id={`file-upload-${i}`}
                className="hidden"
                onChange={(e) => handleImageUpload(e, i)}
              />
              <label
                htmlFor={`file-upload-${i}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-4 right-4 transition cursor-pointer"
              >
                {uploadingIndex === i ? (
                  <span className="text-xs text-gray-500 animate-pulse">
                    확인 중...
                  </span>
                ) : (
                  <Icon src="/camera.svg" name="camera" size={24} />
                )}
              </label>
            </div>
          );
        })}
      </section>

      <div className="flex flex-col items-center justify-center mt-6">
        <button
          onClick={handleRecord}
          disabled={completedLines.length === 0}
          className={`py-3 px-8 rounded-lg shadow-md transition font-bold text-white ${
            completedLines.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600'
          }`}
        >
          빙고 제출하기
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          한 줄 완료 시, 뱃지 증정 / 세 줄 모두 완료 시, 봉사 시간 부여
        </p>
      </div>

      <Modal
        isOpen={isCompleteModalOpen}
        closeModal={() => setIsCompleteModalOpen(false)}
      >
        <div className="w-[400px] p-10 text-center border-4 border-amber-400 rounded-xl shadow-xl">
          <Icon src="/badge1.svg" name="badge" size={64} />
          <h2 className="text-2xl font-bold mb-2">빙고 성공!</h2>
          <p className="text-gray-500 text-sm mb-6">
            축하합니다! 한 줄 이상 완성했어요 🎉
          </p>
          <Button variant="no" onClick={() => setIsCompleteModalOpen(false)}>
            닫기
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default BingoPage;
