import { Indicator, Root } from '@radix-ui/react-checkbox';
import s from './checkbox.module.scss';
import clsx from 'clsx';
import CheckboxIcon from '@/shared/assets/icons/check.svg';

type Props = {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = ({ checked = false, disabled = false, onCheckedChange, ...props }: Props) => {
  const classNames = {
    indicator: clsx(s.indicator, disabled && s.disabled),
    checkboxWrapper: clsx(s.checkboxWrapper, disabled && s.disabled),
  };

  return (
    <div className={classNames.checkboxWrapper}>
      <Root checked={checked} className={s.checkbox} disabled={disabled} onCheckedChange={value => onCheckedChange?.(!!value)} {...props}>
        <Indicator className={classNames.indicator}>
          <CheckboxIcon />
        </Indicator>
      </Root>
    </div>
  );
};
