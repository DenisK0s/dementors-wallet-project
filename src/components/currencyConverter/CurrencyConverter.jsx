import { useState } from "react";
import s from "./CurrencyConverter.module.css";
import CurrencyConverterItem from "./CurrencyConverterItem";
import { ReactComponent as Arrows } from "../../assets/images/icons/two-arrows-clockwise-rotating-circle-ultrathin-outline-svgrepo-com.svg";

const CurrencyConverter = ({ currencyData, currencySelectOptions }) => {
  console.log(currencyData);
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  return (
    <div className={s.currencyConverter}>
      <CurrencyConverterItem options={currencySelectOptions} selectedCurrency={fromCurrency} />
      <Arrows width="30px" height="30px" fill="#fff" className={s.arrowsIcon} />
      <CurrencyConverterItem options={currencySelectOptions} selectedCurrency={toCurrency} />
    </div>
  );
};

export default CurrencyConverter;
