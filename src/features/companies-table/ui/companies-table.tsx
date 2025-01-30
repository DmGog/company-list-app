import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared';
import { deleteCompanies, toggleSelectAll, toggleSelectCompany, updateCompany } from '@/entities';
import s from './companies-table.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useRef, RefObject, KeyboardEvent } from 'react';

export const CompaniesTable = () => {
  const companies = useAppSelector(state => state.companies);
  const dispatch = useAppDispatch();

  const selectedCompanies = companies.filter(company => company.selected);
  const allSelected = selectedCompanies.length === companies.length && companies.length > 0;

  const handleSelectAll = () => {
    dispatch(toggleSelectAll(!allSelected));
  };

  const handleSelectCompany = (id: string) => () => {
    dispatch(toggleSelectCompany(id));
  };

  const handleDeleteCompany = (id: string) => () => {
    dispatch(deleteCompanies([id]));
  };

  const handleDeleteSelected = () => {
    const selectedIds = companies.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length > 0) {
      dispatch(deleteCompanies(selectedIds));
    }
  };

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

  const handleEditCompany = (company: any) => {
    setEditingCompanyId(company.id);
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
      if (error) setError(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
    if (error) setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, nextRef?: RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter' && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  return (
    <div className={s.companiesTable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell className={s.headCell}>
              <div className={s.actionHeadCell}>
                <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
                {selectedCompanies.length > 0 && <Button iconVariant="delete" onlyIcon onClick={handleDeleteSelected} />}
              </div>
            </TableHeadCell>
            <TableHeadCell>Название компании</TableHeadCell>
            <TableHeadCell>Адрес компании</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map(company => {
            const isEditing = editingCompanyId === company.id;
            return (
              <TableRow key={company.id} className={clsx(s.rowBody, company.selected && s.selected)}>
                <TableCell>
                  <Checkbox checked={company.selected} onCheckedChange={handleSelectCompany(company.id)} />
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <input
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
                        ref={countryRef}
                        value={editedCountry}
                        onChange={e => setEditedCountry(e.target.value)}
                        onKeyDown={e => handleKeyDown(e, cityRef)}
                        placeholder="Введите страну"
                      />
                      <input
                        ref={cityRef}
                        value={editedCity}
                        onChange={e => setEditedCity(e.target.value)}
                        onKeyDown={e => handleKeyDown(e, streetRef)}
                        placeholder="Введите город"
                      />
                      <input
                        ref={streetRef}
                        value={editedStreet}
                        onChange={e => setEditedStreet(e.target.value)}
                        onKeyDown={e => handleKeyDown(e, houseNumberRef)}
                        placeholder="Введите улицу"
                      />
                      <input
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
                        <Button onlyIcon iconVariant="delete" onClick={handleDeleteCompany(company.id)} />
                        <Button onlyIcon iconVariant="edit" onClick={() => handleEditCompany(company)} />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
