import './app.module.scss';
import { AddCompanyForm, CompaniesTable } from '@/features';
import s from './app.module.scss';
import { Button } from '@/shared';
import { useState } from 'react';

function App() {
  const [addShowModal, setAddShowModal] = useState<boolean>(false);
  const handleAddShowModal = () => {
    setAddShowModal(!addShowModal);
  };

  return (
    <section className={s.section}>
      <div className={s.headerWrapper}>
        <h2 className={s.title}>Список компаний</h2>
        <Button onClick={handleAddShowModal} title="+ Добавить компанию" variant="outlined" className={s.addButton} />
      </div>
      <CompaniesTable />
      <AddCompanyForm isOpen={addShowModal} onClose={handleAddShowModal} />
    </section>
  );
}

export default App;
