import './app.module.scss';
import { CompaniesTable } from '@/features';
import s from './app.module.scss';
import { Button, DialogModal } from '@/shared';
import { useState } from 'react';
import { useAppDispatch } from '@/app/store';

function App() {
  const [addShowModal, setAddShowMoal] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickAdd = () => {
    setAddShowMoal(true);
  };

  const handleClickClose = () => {
    setAddShowMoal(false);
  };

  return (
    <section className={s.section}>
      <div className={s.headerWrapper}>
        <h2 className={s.title}>Список компаний</h2>
        <Button onClick={handleClickAdd} title="+ Добавить компанию" variant="outlined" className={s.addButton} />
      </div>
      <CompaniesTable />
      {addShowModal && (
        <DialogModal title="Добавить компанию" isOpen={addShowModal} onClose={handleClickClose}>
          Добавить компанию
        </DialogModal>
      )}
    </section>
  );
}

export default App;
