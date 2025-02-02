import { ReactNode } from 'react';
import DeleteIcon from '@/shared/assets/icons/trash.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DoneIcon from '@/shared/assets/icons/check.svg';
import CancelIcon from '@/shared/assets/icons/cross.svg';
import clsx from 'clsx';
import s from './button.module.scss';
import { getAriaLabel } from '@/shared/lib';

const iconMap: Record<Icon, ReactNode> = {
  delete: <DeleteIcon />,
  edit: <EditIcon />,
  done: <DoneIcon />,
  cancel: <CancelIcon />,
};

export type Icon = 'delete' | 'edit' | 'done' | 'cancel';

type Props = {
  onlyIcon?: boolean;
  iconVariant?: Icon;
  variant?: 'filled' | 'outlined';
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  className?: string;
};
s;
export const Button = ({ iconVariant, onClick, onlyIcon, variant = 'outlined', title, disabled, className }: Props) => {
  const classNames = {
    button: clsx(s.button, s[variant], disabled && s.disabled, className),
    icon: clsx(onlyIcon && s.onlyIcon),
  };

  const ariaLabel = onlyIcon && iconVariant ? getAriaLabel(iconVariant) : undefined;

  return (
    <button
      className={clsx(classNames.button, classNames.icon)}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      {onlyIcon && iconVariant && iconMap[iconVariant]}
      {title}
    </button>
  );
};
