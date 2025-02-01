import { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import s from './form-input.module.scss';
import clsx from 'clsx';

type Props = {
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(({ name, className, value, onChange, placeholder, error, onKeyDown }, ref) => {
  const classNames = {
    input: clsx(s.input, className),
  };

  return (
    <div className={s.inputWrapper}>
      <input
        ref={ref}
        autoComplete="off"
        onKeyDown={onKeyDown}
        className={classNames.input}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={40}
      />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
});

FormInput.displayName = 'FormInput';
