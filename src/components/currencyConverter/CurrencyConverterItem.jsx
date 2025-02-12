import React from "react";
import PropTypes from "prop-types";
import CurrencySelect from "./CurrencySelect";
import s from "./CurrencyConverter.module.css";

const CurrencyConverterItem = ({
  amount,
  options,
  placeholder,
  selectValue,
  onChangeCurrency,
  onChangeAmount,
}) => {
  return (
    <div className={s.converterItem}>
      <input
        type="number"
        value={amount}
        placeholder={placeholder}
        className={s.converterItemTextField}
        onChange={onChangeAmount}
      />
      <CurrencySelect options={options} value={selectValue} onChange={onChangeCurrency} />
    </div>
  );
};

CurrencyConverterItem.propTypes = {
  amount: PropTypes.string,
  placeholder: PropTypes.string,
  selectValue: PropTypes.string.isRequired,
  onChangeCurrency: PropTypes.func,
  onChangeAmount: PropTypes.func,
};

export default CurrencyConverterItem;
