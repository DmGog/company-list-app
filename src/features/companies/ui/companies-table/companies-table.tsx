import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/store';
import { Table, TableBody } from '@/shared';
import { loadMoreCompanies, toggleSelectAll } from '@/entities';

import { CompanyRow } from './company-row';
import { useDeleteCompanies } from '../../hooks';
import clsx from 'clsx';
import s from './companies-table.module.scss';
import { CompaniesTableHeader } from './companies-table-head';
import { DialogModalConfirmation } from '@/widgets';

const SCROLL_THRESHOLD = 10;

export const CompaniesTable = memo(() => {
  const { displayedCompanies, isEditingGlobal, companies } = useAppSelector(state => state.companies);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const selectedCompanies = displayedCompanies.filter(company => company.selected);
  const allSelected = selectedCompanies.length === displayedCompanies.length && displayedCompanies.length > 0;
  const { isModalOpen, dispatch, modalData, openDeleteModalForSelected, confirmDelete, closeDeleteModal } = useDeleteCompanies();

  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
        dispatch(loadMoreCompanies());
      }
    }
  }, [dispatch]);

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
        <CompaniesTableHeader
          allSelected={allSelected}
          selectedCompaniesCount={selectedCompanies.length}
          onToggleSelectAll={() => dispatch(toggleSelectAll(!allSelected))}
          onDeleteSelected={openDeleteModalForSelected}
          isEditingGlobal={isEditingGlobal}
          totalCompanies={companies.length}
        />
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
});

CompaniesTable.displayName = 'CompaniesTable';
