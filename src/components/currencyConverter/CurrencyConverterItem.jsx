import React from "react";
// import PropTypes from "prop-types";
import CurrencySelect from "./CurrencySelect";
import s from "./CurrencyConverter.module.css";

const CurrencyConverterItem = ({ options, placeholder, selectedCurrency }) => {
  return (
    <div className={s.converterItem}>
      <input type="number" placeholder={placeholder} className={s.converterItemTextField} />
      <CurrencySelect options={options} defaultValue={selectedCurrency} />
    </div>
  );
};

// CurrencyConverterItem.propTypes = propTypes;
// CurrencyConverterItem.defaultProps = defaultProps;

export default CurrencyConverterItem;
