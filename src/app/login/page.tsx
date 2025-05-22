'use client';
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import axios from 'axios';

const Page = () => {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('로그인 성공:', user.displayName);

      // ✅ Firebase ID Token 추출 (JWT 형식)
      const idToken = await user.getIdToken();
      console.log(idToken);

      // ✅ 백엔드에 토큰 전송 (axios 사용)
      // const response = await axios.post(
      //   'https://your-backend.com/auth', // 백엔드 API 주소로 교체
      //   {}, // body 필요 시 작성
      //   {
      //     headers: {
      //       Authorization: `Bearer ${idToken}`, // 표준 Authorization 헤더
      //     },
      //   }
      // );

      // console.log( 백엔드 응답:', response.data);
      return user;
    } catch (error) {
      console.error('❌ 로그인 또는 토큰 전송 실패:', error);
      return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
      >
        🔐 Google 로그인
      </button>
    </div>
  );
};

export default Page;
