import clsx from 'clsx';
import { Checkbox, FormInput, TableCell, TableRow } from '@/shared';
import { Company, deleteCompanies, toggleEditing, toggleSelectCompany, updateCompany } from '@/entities';
import s from './company-row.module.scss';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { CompanyRowActions } from '@/widgets';
import { useCompanyForm } from '@/features/hooks';

type AddressKey = 'country' | 'city' | 'street' | 'houseNumber';

type Props = {
  company: Company;
  disabled: boolean;
};

export const CompanyRow = ({ company, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const { formFields, inputRefs, form, errors, validateForm, handleChange, resetForm } = useCompanyForm();

  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);

  useEffect(() => {
    if (editingCompanyId) {
      inputRefs[0]?.current?.focus();
    }
  }, [editingCompanyId]);

  const handleEditCompany = (company: Company) => {
    setEditingCompanyId(company.id);
    dispatch(toggleEditing(true));

    formFields.forEach(({ name }) => {
      handleChange(name, name === 'name' ? company.name : company.address[name as AddressKey] || '');
    });
  };

  const handleSaveEdit = () => {
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
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
    dispatch(toggleEditing(false));
    resetForm();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && inputRefs[index + 1]) {
      e.preventDefault();
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleSelectCompany = (id: string) => () => {
    dispatch(toggleSelectCompany(id));
  };

  const handleDeleteCompany = (id: string) => () => {
    dispatch(deleteCompanies([id]));
  };

  const isEditing = editingCompanyId === company.id;

  const classNames = {
    rowBody: clsx(s.rowBody, company.selected && s.selected),
    editInput: clsx(errors && s.error),
  };

  return (
    <TableRow key={company.id} className={classNames.rowBody}>
      <TableCell>
        <Checkbox checked={company.selected} onCheckedChange={handleSelectCompany(company.id)} disabled={disabled && !isEditing} />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <FormInput
            className={classNames.editInput}
            ref={inputRefs[0]}
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            onKeyDown={e => handleKeyDown(e, 0)}
            placeholder="Введите компанию"
            name="company"
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
                ref={inputRefs[index + 1]}
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
          onDelete={handleDeleteCompany(company.id)}
          onEdit={() => handleEditCompany(company)}
        />
      </TableCell>
    </TableRow>
  );
};
