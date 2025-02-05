import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteCompanies } from '@/entities';

export const useDeleteCompanies = () => {
  const dispatch = useAppDispatch();
  const displayedCompanies = useAppSelector(state => state.companies.displayedCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ titleCompany?: string; totalCompanies?: number; companyIds: string[] } | null>(null);

  const openDeleteModalForCompany = useCallback((companyId: string, companyName: string) => {
    setModalData({ titleCompany: companyName, companyIds: [companyId] });
    setIsModalOpen(true);
  }, []);

  const openDeleteModalForSelected = useCallback(() => {
    const selectedCompanies = displayedCompanies.filter(c => c.selected);
    if (selectedCompanies.length > 0) {
      setModalData({ totalCompanies: selectedCompanies.length, companyIds: selectedCompanies.map(c => c.id) });
      setIsModalOpen(true);
    }
  }, [displayedCompanies]);

  const confirmDelete = useCallback(() => {
    if (modalData?.companyIds.length) {
      dispatch(deleteCompanies(modalData.companyIds));
    }
    setIsModalOpen(false);
  }, [dispatch, modalData]);

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
