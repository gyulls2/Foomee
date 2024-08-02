const StepIndicator = ({ current }: { current: string }) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex space-x-3">
        <li className="flex items-center">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${current === '1' ? 'bg-[#FF7A00]' : 'bg-gray-200'}`}
          >
            1
          </span>
        </li>
        <li className="flex items-center">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${current === '2' ? 'bg-[#FF7A00]' : 'bg-gray-200'}`}
          >
            2
          </span>
        </li>
        <li className="flex items-center">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${current === '3' ? 'bg-[#FF7A00]' : 'bg-gray-200'}`}
          >
            3
          </span>
        </li>
        <li className="flex items-center">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${current === '4' ? 'bg-[#FF7A00]' : 'bg-gray-200'}`}
          >
            4
          </span>
        </li>
        <li className="flex items-center">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${current === '5' ? 'bg-[#FF7A00]' : 'bg-gray-200'}`}
          >
            5
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default StepIndicator;
