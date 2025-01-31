import clsx from 'clsx';
import { Checkbox, FormInput, TableCell, TableRow } from '@/shared';
import { Company, deleteCompanies, toggleEditing, toggleSelectCompany, updateCompany } from '@/entities';
import s from './company-row.module.scss';
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { CompanyRowActions } from '@/widgets';

type Props = {
  company: Company;
  disabled: boolean;
};

export const CompanyRow = ({ company, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedCountry, setEditedCountry] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedStreet, setEditedStreet] = useState('');
  const [editedHouseNumber, setEditedHouseNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const streetRef = useRef<HTMLInputElement | null>(null);
  const houseNumberRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingCompanyId && nameRef.current) {
      nameRef.current.focus();
    }
  }, [editingCompanyId]);

  const handleEditCompany = (company: Company) => {
    setEditingCompanyId(company.id);
    dispatch(toggleEditing(true));
    setEditedName(company.name);
    setEditedCountry(company.address.country);
    setEditedCity(company.address.city);
    setEditedStreet(company.address.street);
    setEditedHouseNumber(company.address.houseNumber);
    setError(null);
  };

  const handleSaveEdit = () => {
    if (!editedName || !editedCountry || !editedCity || !editedStreet || !editedHouseNumber) {
      setError('Все поля обязательны для заполнения!');
      return;
    }

    if (editingCompanyId) {
      dispatch(
        updateCompany({
          id: editingCompanyId,
          name: editedName,
          address: {
            country: editedCountry,
            city: editedCity,
            street: editedStreet,
            houseNumber: editedHouseNumber,
          },
        }),
      );
      setEditingCompanyId(null);
      dispatch(toggleEditing(false));
      if (error) setError(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
    dispatch(toggleEditing(false));
    if (error) setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, nextRef?: RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter' && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
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
    editInput: clsx(error && s.error),
  };

  return (
    <TableRow key={company.id} className={classNames.rowBody}>
      <TableCell>
        <Checkbox checked={company.selected} onCheckedChange={handleSelectCompany(company.id)} disabled={disabled && !editingCompanyId} />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <FormInput
            className={classNames.editInput}
            ref={nameRef}
            name={editedName}
            value={editedName}
            placeholder={'Введите компанию'}
            onChange={e => setEditedName(e.target.value)}
            onKeyDown={e => handleKeyDown(e, countryRef)}
          />
        ) : (
          company.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <div className={s.editAddressCell}>
            <FormInput
              className={classNames.editInput}
              ref={countryRef}
              name={editedCountry}
              value={editedCountry}
              placeholder="Введите страну"
              onChange={e => setEditedCountry(e.target.value)}
              onKeyDown={e => handleKeyDown(e, cityRef)}
            />
            <FormInput
              className={classNames.editInput}
              ref={cityRef}
              name={editedCity}
              value={editedCity}
              placeholder="Введите город"
              onChange={e => setEditedCity(e.target.value)}
              onKeyDown={e => handleKeyDown(e, streetRef)}
            />
            <FormInput
              className={classNames.editInput}
              ref={streetRef}
              name={editedStreet}
              value={editedStreet}
              placeholder="Введите улицу"
              onChange={e => setEditedStreet(e.target.value)}
              onKeyDown={e => handleKeyDown(e, houseNumberRef)}
            />
            <FormInput
              className={classNames.editInput}
              ref={houseNumberRef}
              name={editedHouseNumber}
              value={editedHouseNumber}
              placeholder="Введите дом"
              onChange={e => setEditedHouseNumber(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
            />
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
