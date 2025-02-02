import './app.module.scss';
import { AddCompanyForm, CompaniesTable } from '@/features';
import s from './app.module.scss';
import { useState } from 'react';
import { useAppSelector } from '@/app/store';
import { CompanyHeader } from '@/widgets';

function App() {
  const isEditing = useAppSelector(state => state.companies.isEditingGlobal);
  const [addShowModal, setAddShowModal] = useState<boolean>(false);
  const handleAddShowModal = () => {
    setAddShowModal(prev => !prev);
  };

  return (
    <section className={s.section}>
      <CompanyHeader onAddCompany={handleAddShowModal} isEditing={isEditing} />
      <CompaniesTable />
      <AddCompanyForm isOpen={addShowModal} onClose={handleAddShowModal} />
    </section>
  );
}

export default App;
