import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteCompanies } from '@/entities';

export const useDeleteCompanies = () => {
  const dispatch = useAppDispatch();
  const displayedCompanies = useAppSelector(state => state.companies.displayedCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ titleCompany?: string; totalCompanies?: number; companyIds: string[] } | null>(null);

  const openDeleteModalForCompany = (companyId: string, companyName: string) => {
    setModalData({ titleCompany: companyName, companyIds: [companyId] });
    setIsModalOpen(true);
  };

  const openDeleteModalForSelected = () => {
    const selectedCompanies = displayedCompanies.filter(c => c.selected);
    if (selectedCompanies.length > 0) {
      setModalData({ totalCompanies: selectedCompanies.length, companyIds: selectedCompanies.map(c => c.id) });
      setIsModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (modalData?.companyIds.length) {
      dispatch(deleteCompanies(modalData.companyIds));
    }
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalData,
    openDeleteModalForCompany,
    openDeleteModalForSelected,
    confirmDelete,
    closeDeleteModal: () => setIsModalOpen(false),
    dispatch,
  };
};
