import clsx from 'clsx';
import { Button, Checkbox, TableCell, TableRow } from '@/shared';
import { Company, deleteCompanies, toggleEditing, toggleSelectCompany, updateCompany } from '@/entities';
import s from './company-row.module.scss';
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/app/store';

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
          address: { country: editedCountry, city: editedCity, street: editedStreet, houseNumber: editedHouseNumber },
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
    editInput: clsx(s.editInput, error && s.error),
  };

  return (
    <TableRow key={company.id} className={classNames.rowBody}>
      <TableCell>
        <Checkbox checked={company.selected} onCheckedChange={handleSelectCompany(company.id)} disabled={disabled && !editingCompanyId} />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <input
            className={classNames.editInput}
            ref={nameRef}
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            onKeyDown={e => handleKeyDown(e, countryRef)}
            placeholder="Введите компанию"
          />
        ) : (
          company.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <input
              className={classNames.editInput}
              ref={countryRef}
              value={editedCountry}
              onChange={e => setEditedCountry(e.target.value)}
              onKeyDown={e => handleKeyDown(e, cityRef)}
              placeholder="Введите страну"
            />
            <input
              className={classNames.editInput}
              ref={cityRef}
              value={editedCity}
              onChange={e => setEditedCity(e.target.value)}
              onKeyDown={e => handleKeyDown(e, streetRef)}
              placeholder="Введите город"
            />
            <input
              className={classNames.editInput}
              ref={streetRef}
              value={editedStreet}
              onChange={e => setEditedStreet(e.target.value)}
              onKeyDown={e => handleKeyDown(e, houseNumberRef)}
              placeholder="Введите улицу"
            />
            <input
              className={classNames.editInput}
              ref={houseNumberRef}
              value={editedHouseNumber}
              onChange={e => setEditedHouseNumber(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
              placeholder="Введите дом"
            />
          </>
        ) : (
          `${company.address.country}, ${company.address.city}, ${company.address.street} ${company.address.houseNumber}`
        )}
      </TableCell>
      <TableCell className={s.actionCellBody}>
        <div className={s.actionCell}>
          {isEditing ? (
            <>
              <Button onlyIcon iconVariant="done" onClick={handleSaveEdit} />
              <Button onlyIcon iconVariant="cancel" onClick={handleCancelEdit} />
            </>
          ) : (
            <>
              <Button onlyIcon iconVariant="delete" onClick={handleDeleteCompany(company.id)} disabled={disabled} />
              <Button onlyIcon iconVariant="edit" onClick={() => handleEditCompany(company)} disabled={disabled} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
