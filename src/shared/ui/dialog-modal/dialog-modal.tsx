import { ReactNode } from 'react';
import { Root, Portal, Overlay, Content, Title, Close } from '@radix-ui/react-dialog';
import s from './dialog-modal.module.scss';
import clsx from 'clsx';
import CloseIcon from '@/shared/assets/icons/cross.svg';

type Props = {
  children: ReactNode;
  className?: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const DialogModal = ({ children, className, isOpen, onClose, title }: Props) => {
  return (
    <Root open={isOpen}>
      <Portal>
        <Overlay aria-describedby={undefined} className={s.overlay} />
        <Content aria-describedby={''} className={clsx(s.container, className)}>
          <div className={s.headContainer}>
            <Title className={s.title}>{title}</Title>
            <Close className={s.closeBtn} onClick={onClose}>
              <CloseIcon />
            </Close>
          </div>
          {children}
        </Content>
      </Portal>
    </Root>
  );
};
