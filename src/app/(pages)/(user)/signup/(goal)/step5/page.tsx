import StepIndicator from '@/components/StepIndicator';
import Step5Form from './Step5Form';
import { auth } from '@/auth';

const Step5Page = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-10  min-h-full h-full">
      <StepIndicator current="5" />
      <h2 className="font-semibold leading-9 text-2xl text-gray-900">
        목표 달성을 도울
        <br />
        매니저를 선택해주세요
      </h2>
      <Step5Form session={session} />
    </div>
  );
};

export default Step5Page;
