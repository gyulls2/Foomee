'use client';

import { signInWithGoogle } from '@/data/actions/authAction';

const OAuthButtons = () => {
  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div className="flex gap-6 justify-center">
      <button>카카오</button>
      <button onClick={handleGoogleLogin}>구글</button>
      <button>네이버</button>
    </div>
  );
};

export default OAuthButtons;
