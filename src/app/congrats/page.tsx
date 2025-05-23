'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/Button';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

const BingoCompletePage = () => {
  const router = useRouter();

  useEffect(() => {
    // 빵빠레 효과 (한 번만 실행)
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          🎉 빙고 완료! 🎉
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          축하합니다! 모든 챌린지를 완수하셨어요. 뱃지와 봉사 시간도 곧
          지급됩니다!
        </p>
        <Button variant="yes" onClick={() => router.push('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </main>
  );
};

export default BingoCompletePage;
