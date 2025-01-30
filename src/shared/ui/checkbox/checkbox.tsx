import { Indicator, Root } from '@radix-ui/react-checkbox';
import s from './checkbox.module.scss';
import clsx from 'clsx';
import * as Label from '@radix-ui/react-label';
import CheckboxIcon from '@/shared/assets/icons/check.svg';

type Props = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = ({ checked = false, disabled = false, label, onCheckedChange, ...props }: Props) => {
  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    checkboxWrapper: clsx(s.checkboxWrapper, disabled && s.disabled),
  };

  return (
    <div className={s.container}>
      <Label.Root className={classNames.label}>
        <div className={classNames.checkboxWrapper}>
          <Root
            checked={checked}
            className={s.checkbox}
            disabled={disabled}
            onCheckedChange={value => onCheckedChange?.(!!value)}
            {...props}
          >
            <Indicator className={classNames.indicator}>
              <CheckboxIcon />
            </Indicator>
          </Root>
        </div>
        {label}
      </Label.Root>
    </div>
  );
};
