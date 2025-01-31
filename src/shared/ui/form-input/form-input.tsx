import { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import s from './form-input.module.scss';

type Props = {
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(({ name, value, onChange, placeholder, error, onKeyDown }, ref) => {
  return (
    <div className={s.inputWrapper}>
      <input
        ref={ref}
        autoComplete="off"
        onKeyDown={onKeyDown}
        className={s.input}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
});

FormInput.displayName = 'FormInput';
