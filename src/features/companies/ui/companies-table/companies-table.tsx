import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/store';
import { Button, Checkbox, Table, TableBody, TableHead, TableHeadCell, TableRow } from '@/shared';
import { toggleSelectAll, loadMoreCompanies } from '@/entities';

import { CompanyRow } from './company-row';
import { useDeleteCompanies } from '@/features/companies/hooks';
import clsx from 'clsx';
import s from './companies-table.module.scss';
import { DialogModalConfirmation } from '@/features';

export const CompaniesTable = () => {
  const { displayedCompanies, isEditingGlobal, companies } = useAppSelector(state => state.companies);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const selectedCompanies = displayedCompanies.filter(company => company.selected);
  const allSelected = selectedCompanies.length === displayedCompanies.length && displayedCompanies.length > 0;
  const { isModalOpen, dispatch, modalData, openDeleteModalForSelected, confirmDelete, closeDeleteModal } = useDeleteCompanies();

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
                  onCheckedChange={() => dispatch(toggleSelectAll(!allSelected))}
                  disabled={isEditingGlobal || displayedCompanies.length < 1}
                />
                {selectedCompanies.length > 0 && (
                  <Button iconVariant="delete" onlyIcon onClick={openDeleteModalForSelected} disabled={isEditingGlobal} />
                )}
              </div>
            </TableHeadCell>
            <TableHeadCell>Название компании</TableHeadCell>
            <TableHeadCell>Адрес компании</TableHeadCell>
            <TableHeadCell>Количество компаний: {companies.length}</TableHeadCell>
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
      {isModalOpen && (
        <DialogModalConfirmation
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          dialogTitle="Подтверждение удаления"
          totalCompanies={modalData?.totalCompanies}
          titleCompany={modalData?.titleCompany}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};
