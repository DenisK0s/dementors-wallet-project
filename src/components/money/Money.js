import s from './Money.module.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { getExchangeRates } from 'api/money';
import { useEffect, useState } from 'react';
export default function Money() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    let clear = true;

    (async () => {
      const date = await getExchangeRates();
      const result = date?.filter(item => item.ccy !== 'BTC');
      if (clear) {
        setCurrencies(result);
      }
    })();

    return () => (clear = false);
  }, []);
  return (
    <table className={s.container}>
      <TableHeader />
      <tbody className={s.gap}>
        {currencies?.map(item => {
          return <TableRow key={item.ccy} date={item} />;
        })}
      </tbody>
    </table>
  );
}
