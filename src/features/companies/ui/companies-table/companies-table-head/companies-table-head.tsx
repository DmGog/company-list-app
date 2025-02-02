import { TableHead, TableHeadCell, TableRow, Checkbox, Button } from '@/shared';
import s from './companies-table-head.module.scss';

type Props = {
  allSelected: boolean;
  selectedCompaniesCount: number;
  onToggleSelectAll: () => void;
  onDeleteSelected: () => void;
  isEditingGlobal: boolean;
  totalCompanies: number;
};

export const CompaniesTableHeader = ({
  allSelected,
  selectedCompaniesCount,
  onToggleSelectAll,
  onDeleteSelected,
  isEditingGlobal,
  totalCompanies,
}: Props) => {
  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        <TableHeadCell>
          <div className={s.actionHeadCell}>
            <Checkbox checked={allSelected} onCheckedChange={onToggleSelectAll} disabled={isEditingGlobal || totalCompanies < 1} />
            {selectedCompaniesCount > 0 && <Button iconVariant="delete" onlyIcon onClick={onDeleteSelected} disabled={isEditingGlobal} />}
          </div>
        </TableHeadCell>
        <TableHeadCell>Название компании</TableHeadCell>
        <TableHeadCell>Адрес компании</TableHeadCell>
        <TableHeadCell>Количество компаний: {totalCompanies}</TableHeadCell>
      </TableRow>
    </TableHead>
  );
};
