'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../auth/firebase';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showText, setShowText] = useState(false);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const imgUrl = user.photoURL;
      console.log(idToken);
      setAuth(idToken, user.displayName ?? '', user.email ?? '', imgUrl ?? '');
      router.push('/main');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError('로그인에 실패했습니다: ' + err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-white px-6 py-12 relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        {showText && (
          <div className="flex flex-col items-center justify-center">
            <h2
              style={{
                opacity: 0,
                animation: 'fadeInUp 2s ease-out forwards',
              }}
              className="text-5xl mb-20 leading-relaxed font-semibold text-center text-gray-900"
            >
              오늘, 할머님들과
              <br />
              따뜻한 하루를 함께할까요?
            </h2>

            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-20 h-20 mt-15 p-5 flex items-center justify-center rounded-full shadow-lg border border-gray-300 hover:scale-110 hover:shadow-xl transition duration-200 disabled:opacity-50 bg-white"
              style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease-out forwards',
                animationDelay: '0.4s',
              }}
              aria-label="Google 로그인"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-10 h-10"
              />
            </button>

            <span
              className="text-gray-400 text-sm mt-5"
              style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease-out forwards',
                animationDelay: '0.4s',
              }}
            >
              Google로 로그인하기
            </span>
          </div>
        )}
      </div>

      <div className="w-full">
        {error && (
          <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>

      {/* 후기 말풍선 */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[5%] animate-bubble1 text-m bg-white rounded-full shadow px-8 py-6">
            청년들 덕분에 너무 재밌었어요~^^
          </div>
          <div className="absolute top-[25%] right-[5%] animate-bubble2 text-m bg-white rounded-full shadow px-8 py-6">
            손주 손녀들 보는 것 같았어요.
          </div>
          <div className="absolute bottom-[15%] right-[10%] animate-bubble3 text-m bg-white rounded-full shadow px-8 py-6">
            오랜만에 젊은 사람들을 보는 것 같아요.
          </div>
          <div className="absolute bottom-[15%] left-[5%] animate-bubble3 text-m bg-white rounded-full shadow px-8 py-6">
            오랜만에 돈 좀 썼지만, 너무 값진 경험이었어요.
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bubble1 {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }

        @keyframes bubble2 {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes bubble3 {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }

        .animate-bubble1 {
          animation: bubble1 4s ease-in-out infinite;
        }

        .animate-bubble2 {
          animation: bubble2 5s ease-in-out infinite;
        }

        .animate-bubble3 {
          animation: bubble3 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
