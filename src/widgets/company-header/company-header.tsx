import { Button } from '@/shared';
import s from './company-header.module.scss';

type Props = {
  onAddCompany: () => void;
  isEditing: boolean;
};

export const CompanyHeader = ({ onAddCompany, isEditing }: Props) => {
  return (
    <div className={s.headerWrapper}>
      <h2 className={s.title}>Список компаний</h2>
      <Button
        onClick={onAddCompany}
        title="+ Добавить компанию"
        variant="outlined"
        className={s.addButton}
        disabled={isEditing}
        aria-label="Добавить новую компанию"
      />
    </div>
  );
};
