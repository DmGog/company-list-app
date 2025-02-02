import { ReactNode, useState } from 'react';
import s from './tooltip.module.scss';

type Props = {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
};
export const Tooltip = ({ children, content, position = 'top' }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div className={s.tooltipContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && (
        <div className={`${s.Content} ${s[position]}`} style={{ visibility: visible ? 'visible' : 'hidden' }}>
          {content}
        </div>
      )}
    </div>
  );
};
