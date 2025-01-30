import { ReactNode } from 'react';
import DeleteIcon from '@/shared/assets/icons/trash.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DoneIcon from '@/shared/assets/icons/check.svg';
import CancelIcon from '@/shared/assets/icons/cross.svg';
import clsx from 'clsx';
import s from './button.module.scss';

const iconMap: Record<Icon, ReactNode> = {
  delete: <DeleteIcon />,
  edit: <EditIcon />,
  done: <DoneIcon />,
  cancel: <CancelIcon />,
};

type Icon = 'delete' | 'edit' | 'done' | 'cancel';

type Props = {
  onlyIcon?: boolean;
  iconVariant?: Icon;
  variant?: 'filled' | 'outlined';
  onClick: () => void;
  title?: string;
  disabled?: boolean;
};

export const Button = ({ iconVariant, onClick, onlyIcon, variant = 'outlined', title, disabled }: Props) => {
  const classNames = {
    button: clsx(s.button, s[variant], disabled && s.disabled),
    icon: clsx(onlyIcon && s.onlyIcon),
  };

  return (
    <button className={clsx(classNames.button, classNames.icon)} onClick={onClick} disabled={disabled}>
      {onlyIcon && iconVariant && iconMap[iconVariant]}
      {title}
    </button>
  );
};
