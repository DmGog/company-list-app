import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Checkbox, Table, TableBody, TableHead, TableHeadCell, TableRow } from '@/shared';
import { deleteCompanies, toggleSelectAll, loadMoreCompanies } from '@/entities';
import s from './companies-table.module.scss';
import { CompanyRow } from './company-row';
import clsx from 'clsx';

export const CompaniesTable = () => {
  const { displayedCompanies, isEditingGlobal } = useAppSelector(state => state.companies);
  const dispatch = useAppDispatch();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const selectedCompanies = displayedCompanies.filter(company => company.selected);
  const allSelected = selectedCompanies.length === displayedCompanies.length && displayedCompanies.length > 0;
  console.log(displayedCompanies);
  const handleSelectAll = () => {
    dispatch(toggleSelectAll(!allSelected));
  };

  const handleDeleteSelected = () => {
    const selectedIds = displayedCompanies.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length > 0) {
      dispatch(deleteCompanies(selectedIds));
    }
  };

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        dispatch(loadMoreCompanies());
      }
    }
  };

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
      return () => tableElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={s.companiesTable}>
      <Table>
        <TableHead className={s.tableHead}>
          <TableRow>
            <TableHeadCell className={s.headCell}>
              <div className={s.actionHeadCell}>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  disabled={isEditingGlobal || displayedCompanies.length < 1}
                />
                {selectedCompanies.length > 0 && (
                  <Button iconVariant="delete" onlyIcon onClick={handleDeleteSelected} disabled={isEditingGlobal} />
                )}
              </div>
            </TableHeadCell>
            <TableHeadCell>Название компании</TableHeadCell>
            <TableHeadCell>Адрес компании</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className={clsx(s.tableBody, isEditingGlobal && s.noScroll)} ref={tableRef} onScroll={handleScroll}>
        <Table>
          <TableBody>
            {displayedCompanies.map(company => (
              <CompanyRow key={company.id} company={company} disabled={isEditingGlobal} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
