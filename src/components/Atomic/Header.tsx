'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuthStore();

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
      toast.success('로그아웃 되었습니다.');
      router.push('/first');
    } else {
      router.push('/login');
    }
  };

  const shouldHideAuthButton = pathname === '/first' || pathname === '/login';

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => router.push('/first')} //header click 시 어디로?
      >
        할매야놀자
      </h1>

      {!shouldHideAuthButton && (
        <button
          onClick={handleAuth}
          className="text-sm text-gray-600 hover:text-black transition"
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      )}
    </header>
  );
};
