import { FieldError } from 'react-hook-form';

interface InputErrorProps {
  target?: FieldError;
}

const InputError: React.FC<InputErrorProps> = ({ target }) => {
  if (!target) return null;
  return (
    <p className="ml-2 mt-2 text-sm text-red-500 dark:text-red-400">
      ⚠ {target.message}
    </p>
  );
};

export default InputError;
