import { Button, DialogModal } from '@/shared';
import s from './dialog-modal-confirmation.module.scss';

type Props = {
  dialogTitle: string;
  isOpen: boolean;
  onClose: () => void;
  totalCompanies?: number;
  titleCompany?: string | null;
  onConfirm: () => void;
};
export const DialogModalConfirmation = ({ isOpen, onClose, dialogTitle, titleCompany, totalCompanies, onConfirm }: Props) => {
  return (
    <DialogModal title={dialogTitle} onClose={onClose} isOpen={isOpen}>
      <div className={s.modalContent}>
        {titleCompany && (
          <span className={s.text}>
            Удалить компанию: <strong>{titleCompany}?</strong>
          </span>
        )}
        {totalCompanies && (
          <span className={s.text}>
            Удалить выбранные компании в количестве <strong>{totalCompanies}?</strong>
          </span>
        )}
        <div className={s.buttonWrapper}>
          <Button onClick={onConfirm} title="Да" variant="filled" className={s.btnYes} />
          <Button onClick={onClose} title="Нет" variant="filled" className={s.btnNo} />
        </div>
      </div>
    </DialogModal>
  );
};
