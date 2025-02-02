import { TableHead, TableHeadCell, TableRow, Checkbox, Button, Tooltip } from '@/shared';
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
            <Tooltip content="Выделить все">
              <Checkbox checked={allSelected} onCheckedChange={onToggleSelectAll} disabled={isEditingGlobal || totalCompanies < 1} />
            </Tooltip>

            {selectedCompaniesCount > 0 && (
              <Tooltip content="Удалить выбранное">
                <Button iconVariant="delete" onlyIcon onClick={onDeleteSelected} disabled={isEditingGlobal} />
              </Tooltip>
            )}
          </div>
        </TableHeadCell>
        <TableHeadCell>Название компании</TableHeadCell>
        <TableHeadCell>Адрес компании</TableHeadCell>
        <TableHeadCell>Количество компаний: {totalCompanies}</TableHeadCell>
      </TableRow>
    </TableHead>
  );
};
