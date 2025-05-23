'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-orange-400 to-orange-50 px-4 py-10">
      {/* 헤더 타이틀 */}
      <section className="text-center space-y-3 mt-10">
        <div className="relative left-16">
          <Icon src="/title.svg" size={500}></Icon>
        </div>
        <p className="text-white font-bold md:text-4xl mt-12">
          지역사회 활성화를 위한 노인과 청년의 연결고리
        </p>
      </section>

      {/* 캐릭터 일러스트 (SVG 파일 경로로 삽입) */}
      <div className="absolute bottom-0 right-90">
        <Icon src="/granma.svg" size={280} />
      </div>

      {/* 다음 버튼 */}
      <div className="mt-10 mb-20">
        <Button
          variant="yes"
          className="bg-orange-200 hover:bg-amber-300 text-black font-semibold px-10 py-3 rounded-full shadow transition"
          onClick={() => router.push('/login')}
        >
          다음{' '}
        </Button>
      </div>
    </main>
  );
}
