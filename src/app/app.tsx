import './app.module.scss';
import { CompaniesTable } from '@/features';
import s from './app.module.scss';

function App() {
  return (
    <div className={s.root}>
      <CompaniesTable />
    </div>
  );
}

export default App;
