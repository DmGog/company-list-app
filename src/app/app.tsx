import './app.module.scss';
import { CompaniesTable } from '@/features';
import s from './app.module.scss';
import { useCallback, useState } from 'react';
import { useAppSelector } from '@/app/store';
import { AddCompanyForm, CompanyHeader } from '@/widgets';

function App() {
  const isEditing = useAppSelector(state => state.companies.isEditingGlobal);
  const [addShowModal, setAddShowModal] = useState<boolean>(false);
  const handleAddShowModal = useCallback(() => {
    setAddShowModal(prev => !prev);
  }, [setAddShowModal]);

  return (
    <section className={s.section}>
      <CompanyHeader onAddCompany={handleAddShowModal} isEditing={isEditing} />
      <CompaniesTable />
      <AddCompanyForm isOpen={addShowModal} onClose={handleAddShowModal} />
    </section>
  );
}

export default App;
