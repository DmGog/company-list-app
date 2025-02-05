import clsx from 'clsx';
import { Checkbox, FormInput, TableCell, TableRow } from '@/shared';
import { Company, toggleEditing, toggleSelectCompany, updateCompany } from '@/entities';
import s from './company-row.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import { CompanyRowActions, DialogModalConfirmation } from '@/widgets';
import { useCompanyForm, useDeleteCompanies } from '../../../hooks';

type AddressKey = 'country' | 'city' | 'street' | 'houseNumber';

type Props = {
  company: Company;
  disabled: boolean;
};

export const CompanyRow = memo(({ company, disabled }: Props) => {
  const { formFields, dispatch, handleKeyDown, inputRefs, form, errors, validateForm, handleChange, resetForm } = useCompanyForm();
  const { isModalOpen, modalData, openDeleteModalForCompany, confirmDelete, closeDeleteModal } = useDeleteCompanies();
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    if (editingCompanyId) {
      timer = window.setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [editingCompanyId, inputRefs]);

  const handleEditCompany = (company: Company) => {
    setEditingCompanyId(company.id);
    dispatch(toggleEditing(true));

    formFields.forEach(({ name }) => {
      handleChange(name, name === 'name' ? company.name : company.address[name as AddressKey] || '');
    });
  };

  const handleSaveEdit = useCallback(() => {
    if (validateForm()) {
      dispatch(
        updateCompany({
          id: editingCompanyId!,
          name: form.name,
          address: {
            country: form.country,
            city: form.city,
            street: form.street,
            houseNumber: form.houseNumber,
          },
        }),
      );
      setEditingCompanyId(null);
      dispatch(toggleEditing(false));
      resetForm();
    }
  }, [dispatch, editingCompanyId, form, validateForm, resetForm]);

  const handleCancelEdit = useCallback(() => {
    setEditingCompanyId(null);
    dispatch(toggleEditing(false));
    resetForm();
  }, [dispatch, resetForm]);

  const handleSelectCompany = useCallback(
    (id: string) => () => {
      dispatch(toggleSelectCompany(id));
    },
    [dispatch],
  );

  const isEditing = editingCompanyId === company.id;

  const classNames = {
    rowBody: clsx(s.rowBody, company.selected && s.selected, isEditing && s.editingRow),
    editInput: clsx(errors && s.error),
  };

  return (
    <>
      <TableRow key={company.id} className={classNames.rowBody}>
        <TableCell className={s.checkboxCell}>
          <Checkbox checked={company.selected} onCheckedChange={handleSelectCompany(company.id)} disabled={disabled && !isEditing} />
        </TableCell>
        <TableCell>
          {isEditing ? (
            <FormInput
              className={classNames.editInput}
              ref={el => (inputRefs.current[0] = el)}
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              onKeyDown={e => handleKeyDown(e, 0)}
              placeholder="Название компании"
              name="name"
            />
          ) : (
            company.name
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <div className={s.editAddressCell}>
              {formFields.slice(1).map(({ id, name, placeholder }, index) => (
                <FormInput
                  key={id}
                  name={name}
                  placeholder={placeholder}
                  className={classNames.editInput}
                  ref={el => (inputRefs.current[index + 1] = el)}
                  value={form[name]}
                  onChange={e => handleChange(name, e.target.value)}
                  onKeyDown={e => handleKeyDown(e, index + 1)}
                />
              ))}
            </div>
          ) : (
            `${company.address.country}, ${company.address.city}, ${company.address.street} ${company.address.houseNumber}`
          )}
        </TableCell>
        <TableCell className={s.actionCellBody}>
          <CompanyRowActions
            isEditing={isEditing}
            disabled={disabled}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={() => openDeleteModalForCompany(company.id, company.name)}
            onEdit={() => handleEditCompany(company)}
          />
        </TableCell>
      </TableRow>
      {isModalOpen && modalData?.titleCompany === company.name && (
        <DialogModalConfirmation
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          dialogTitle="Подтверждение удаления"
          titleCompany={modalData.titleCompany}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
});

CompanyRow.displayName = 'CompanyRow';
