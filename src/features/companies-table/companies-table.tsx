import { useAppSelector } from '@/app/store';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared';

export const CompaniesTable = () => {
  const companies = useAppSelector(state => state.companies);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Название компании</TableHeadCell>
          <TableHeadCell>Адрес компании</TableHeadCell>
          <TableHeadCell>
            <Checkbox label={'выделить все'} checked />
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {companies.map(company => {
          return (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {company.address.country}, {company.address.city}
              </TableCell>
              <TableCell>
                <Checkbox checked />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
