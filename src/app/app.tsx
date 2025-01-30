import './app.module.scss';
import { CompaniesTable } from '@/features';
import s from './app.module.scss';

function App() {
  return (
    <div className={s.root}>
      список компаний
      <CompaniesTable />
    </div>
  );
}

export default App;
