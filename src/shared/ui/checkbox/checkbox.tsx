import { Indicator, Root } from '@radix-ui/react-checkbox';
import s from './checkbox.module.scss';
import { Check } from '@/shared/assets';
import clsx from 'clsx';
import * as Label from '@radix-ui/react-label';

type Props = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = ({ checked = false, disabled = false, label, onCheckedChange, ...props }: Props) => {
  return (
    <div className={s.container}>
      <Label.Root className={clsx(s.label, disabled && s.disabled)}>
        <div className={clsx(s.buttonWrapper, disabled && s.disabled)}>
          <Root
            checked={checked}
            className={s.checkbox}
            disabled={disabled}
            onCheckedChange={value => onCheckedChange?.(!!value)}
            {...props}
          >
            <Indicator className={clsx(s.indicator, disabled && s.disabled)}>
              <Check fill={'black'} height={14} viewBox={'4 8 14 14'} width={14} />
            </Indicator>
          </Root>
        </div>
        {label}
      </Label.Root>
    </div>
  );
};
