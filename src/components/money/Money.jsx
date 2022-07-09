import { getExchangeRates } from "api/money";
import { useEffect, useState } from "react";
import s from "./Money.module.css";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import CurrencyConverter from "../currencyConverter";
import { useMatchMedia } from "../../hooks/use-match-media";

export default function Money() {
  const [currencies, setCurrencies] = useState([]);
  const { isDesctop } = useMatchMedia();

  const currencySelectOptions = currencies.map((currency) => {
    return { value: currency.ccy, label: currency.ccy };
  });

  useEffect(() => {
    let clear = true;

    (async () => {
      const result = await getExchangeRates();
      if (clear) {
        setCurrencies(result);
      }
    })();

    return () => (clear = false);
  }, []);
  return (
    <>
      <table className={s.container}>
        <TableHeader />
        <tbody className={s.gap}>
          {currencies?.map((item) => {
            return <TableRow key={item.ccy} date={item} />;
          })}
        </tbody>
      </table>
      {isDesctop && (
        <CurrencyConverter
          currencyData={currencies}
          currencySelectOptions={currencySelectOptions}
        />
      )}
    </>
  );
}
