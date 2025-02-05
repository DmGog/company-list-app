import s from './company-row-actions.module.scss';
import { Button } from '@/shared';
import { memo } from 'react';

type Props = {
  isEditing: boolean;
  disabled: boolean;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export const CompanyRowActions = memo(({ isEditing, disabled, onSaveEdit, onCancelEdit, onDelete, onEdit }: Props) => {
  return (
    <div className={s.companyRowActions}>
      {isEditing ? (
        <>
          <Button onlyIcon iconVariant="done" onClick={onSaveEdit} />
          <Button onlyIcon iconVariant="cancel" onClick={onCancelEdit} />
        </>
      ) : (
        <>
          <Button onlyIcon iconVariant="delete" onClick={onDelete} disabled={disabled} />
          <Button onlyIcon iconVariant="edit" onClick={onEdit} disabled={disabled} />
        </>
      )}
    </div>
  );
});
CompanyRowActions.displayName = 'CompanyRowActions';
