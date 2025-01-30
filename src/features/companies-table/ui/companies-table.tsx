import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Checkbox, Table, TableBody, TableHead, TableHeadCell, TableRow } from '@/shared';
import { deleteCompanies, toggleSelectAll } from '@/entities';
import s from './companies-table.module.scss';
import { CompanyRow } from './company-row';

export const CompaniesTable = () => {
  const { companies, isEditingGlobal } = useAppSelector(state => state.companies);
  const dispatch = useAppDispatch();

  const selectedCompanies = companies.filter(company => company.selected);
  const allSelected = selectedCompanies.length === companies.length && companies.length > 0;

  const handleSelectAll = () => {
    dispatch(toggleSelectAll(!allSelected));
  };

  const handleDeleteSelected = () => {
    const selectedIds = companies.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length > 0) {
      dispatch(deleteCompanies(selectedIds));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell className={s.headCell}>
            <div className={s.actionHeadCell}>
              <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} disabled={isEditingGlobal} />
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
      <TableBody>
        {companies.map(company => {
          return <CompanyRow key={company.id} company={company} disabled={isEditingGlobal} />;
        })}
      </TableBody>
    </Table>
  );
};
