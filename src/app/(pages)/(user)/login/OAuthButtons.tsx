'use client';

import { signInWithGoogle, signInWithNaver } from '@/data/actions/authAction';

const OAuthButtons = () => {
  return (
    <div className="flex gap-6 justify-center">
      <button>카카오</button>
      <button onClick={() => signInWithGoogle()}>구글</button>
      <button onClick={() => signInWithNaver()}>네이버</button>
    </div>
  );
};

export default OAuthButtons;
