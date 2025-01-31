import './app.module.scss';
import { CompaniesTable } from '@/features';
import s from './app.module.scss';
import { Button } from '@/shared';

function App() {
  return (
    <section className={s.section}>
      <div className={s.headerWrapper}>
        <h2 className={s.title}>Список компаний</h2>
        <Button onClick={() => {}} title="+ Добавить компанию" variant="outlined" className={s.addButton} />
      </div>
      <CompaniesTable />
    </section>
  );
}

export default App;
