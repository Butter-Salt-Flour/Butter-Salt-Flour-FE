'use client';

import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../auth/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('✅ 로그인 성공:', user.displayName);
      const idToken = await user.getIdToken();
      console.log('✅ ID Token:', idToken);

      // ✅ 여기에 백엔드 토큰 전송 API 추가 가능

      // ✅ 로그인 성공 시 리디렉션
      router.push('/dashboard'); // 로그인 후 이동할 페이지
    } catch (err: any) {
      console.error('❌ 로그인 실패:', err);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">할매야놀자</h1>

      <button
        onClick={loginWithGoogle}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? '로그인 중...' : 'Google 계정으로 로그인'}
      </button>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <p className="mt-8 text-gray-500 text-xs">
        로그인하면 할머니와의 하루를 시작할 수 있어요
      </p>
    </div>
  );
}
