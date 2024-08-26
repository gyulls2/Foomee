'use client';

import {
  GithubIcon,
  GoogleIcon,
  NaverIcon,
} from '@/components/icons/IconComponents';
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithNaver,
} from '@/data/actions/authAction';

const OAuthButtons = () => {
  console.log('배포 테스트');
  return (
    <div className="flex flex-col justify-center gap-2">
      <span className="text-center text-xs text-gray-500">
        소셜 계정으로 로그인
      </span>
      <div className="flex gap-6 justify-center">
        <button onClick={() => signInWithNaver()} aria-label="네이버 로그인">
          <NaverIcon />
        </button>
        <button onClick={() => signInWithGoogle()} aria-label="구글 로그인">
          <GoogleIcon />
        </button>
        <button onClick={() => signInWithGithub()} aria-label="깃허브 로그인">
          <GithubIcon />
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
