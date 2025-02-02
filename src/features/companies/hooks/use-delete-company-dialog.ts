import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteCompanies, toggleSelectCompany } from '@/entities';

export const useDeleteCompanyDialog = () => {
  const dispatch = useAppDispatch();
  const selectedCompanies = useAppSelector(state => state.companies.displayedCompanies.filter(company => company.selected));

  const [isOpen, setIsOpen] = useState(false);
  const [companiesToDelete, setCompaniesToDelete] = useState<string[]>([]);
  const [titleCompany, setTitleCompany] = useState<string | null>(null);

  const handleOpenDeleteDialog = (ids: string[], name?: string) => {
    setCompaniesToDelete(ids);
    setTitleCompany(name ?? null);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (companiesToDelete.length > 0) {
      dispatch(deleteCompanies(companiesToDelete));

      selectedCompanies.forEach(company => {
        if (companiesToDelete.includes(company.id)) {
          dispatch(toggleSelectCompany(company.id));
        }
      });
    }

    setIsOpen(false);
    setCompaniesToDelete([]);
    setTitleCompany(null);
  };

  return { isOpen, handleOpenDeleteDialog, handleConfirmDelete, setIsOpen, companiesToDelete, titleCompany };
};
