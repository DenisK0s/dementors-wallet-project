import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import s from "./CurrencyConverter.module.css";
import animationStyles from "../../assets/css/rotateAnimation.module.css";
import CurrencyConverterItem from "./CurrencyConverterItem";
import { ReactComponent as Arrows } from "../../assets/images/icons/two-arrows-clockwise-rotating-circle-ultrathin-outline-svgrepo-com.svg";

const CurrencyConverter = ({ currencyData, currencySelectOptions }) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const defaultAmount = 1;

  const nodeRef = useRef(null);

  let timerId = null;

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const { t } = useTranslation();

  const [exchangeRate, setExchangeRate] = useState("");
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRateStatus, setExchangeRateStatus] = useState(true);
  const [amount, setAmount] = useState(defaultAmount);

  const changeCurrencyHandler = (value) => {
    const currency = currencyData.find((currency) => currency.ccy === value);
    setToCurrency(value);
    const result = exchangeRateStatus ? Number(currency.buy) : Number(currency.sale);

    setExchangeRate(result);
  };

  const textfieldOutputHandler = (amount) => {
    const amountNumber = Number(amount);
    const isResultInteger = Number.isInteger(amountNumber);

    return isResultInteger ? amountNumber.toFixed(2) : amount;
  };

  let fromAmount, toAmount;

  if (exchangeRateStatus && currencyData.length) {
    fromAmount = amount;
    const interimResult = !exchangeRate ? amount / currencyData[0]?.buy : amount / exchangeRate;
    toAmount = interimResult.toFixed(2);
  }

  if (!exchangeRateStatus) {
    fromAmount = amount;
    const interimResult = !exchangeRate ? amount * currencyData[0]?.sale : amount * exchangeRate;
    toAmount = interimResult.toFixed(2);
  }

  const exchangeRateStatusToggler = () => {
    setIsAnimation(true);
    timerId = setTimeout(() => setIsAnimation(false), 500);
    setFromCurrency("UAH");
    setAmount(defaultAmount);
    setExchangeRateStatus(!exchangeRateStatus);
  };

  return (
    <div className={s.currencyConverter}>
      <h2 className={s.converterTitle}>{t("converterTitle")}</h2>
      <div className={s.converterActionsBox}>
        {exchangeRateStatus ? (
          <CurrencyConverterItem
            amount={fromAmount}
            placeholder="0"
            selectValue={fromCurrency}
            onChangeAmount={({ target }) => setAmount(target.value)}
          />
        ) : (
          <CurrencyConverterItem
            amount={fromAmount}
            placeholder="0"
            options={currencySelectOptions}
            selectValue={toCurrency}
            onChangeAmount={({ target }) => setAmount(target.value)}
            onChangeCurrency={(currency) => changeCurrencyHandler(currency.value)}
          />
        )}
        <CSSTransition
          in={isAnimation}
          timeout={1000}
          classNames={animationStyles}
          nodeRef={nodeRef}>
          <>
            <Arrows
              width="50px"
              height="50px"
              fill="#fff"
              ref={nodeRef}
              className={s.arrowsIcon}
              onClick={exchangeRateStatusToggler}
            />
            <p
              className={s.exchangeRateStatusLetter}
              title={
                exchangeRateStatus
                  ? t("exchangeRateStatusBuyTitle")
                  : t("exchangeRateStatusSaleTitle")
              }>
              {exchangeRateStatus ? t("exchangeRateStatusBuy") : t("exchangeRateStatusSale")}
            </p>
          </>
        </CSSTransition>

        {exchangeRateStatus ? (
          <CurrencyConverterItem
            amount={toAmount}
            placeholder="0"
            options={currencySelectOptions}
            selectValue={toCurrency}
            onChangeCurrency={(currency) => {
              changeCurrencyHandler(currency.value);
            }}
          />
        ) : (
          <CurrencyConverterItem amount={toAmount} placeholder="0" selectValue={fromCurrency} />
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
