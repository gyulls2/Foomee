'use client';

const Error = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-center">
        🚧 앗, 무언가 잘못됐네요!
      </h2>
      <p className="pt-12 text-center">
        이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!
      </p>
      <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
        ⚙️ 문제 해결하기
      </button>
    </div>
  );
};

export default Error;
