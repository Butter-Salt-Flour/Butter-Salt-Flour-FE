'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <header className="absolute top-4 left-4 text-sm text-gray-600 font-semibold">
        할매야놀자
      </header>

      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          할매야 놀자
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-md">
          고립된 할머니와, 연결이 필요한 청년을 위한 따뜻한 하루 챌린지
        </p>

        <button
          onClick={() => router.push('/login')}
          className="mt-4 px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          로그인하기
        </button>
      </section>

      <footer className="absolute bottom-6 text-sm text-gray-400">
        “오늘, 할매랑 산책 어때요?”
      </footer>
    </main>
  );
}
