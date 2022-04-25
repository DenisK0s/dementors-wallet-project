import s from './Money.module.css';
import { useSelector } from 'react-redux';
import globalSelectors from 'redux/global/global-selectors';
const TableHeader = () => {
  const lang = useSelector(globalSelectors.lang);
  return (
    <thead className={`${s.tableRow} ${s.tableRowHeader}`}>
      <tr className={s.tableCell}>
        <td>{lang ? 'Currency' : 'Валюта'}</td>
      </tr>
      <tr className={s.tableCell}>
        <td>{lang ? 'Purchase' : 'Покупка'}</td>
      </tr>
      <tr className={s.tableCell}>
        <td>{lang ? 'Sale' : 'Продажа'}</td>
      </tr>
    </thead>
  );
};

export default TableHeader;
