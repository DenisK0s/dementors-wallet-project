import s from './currency.module.css';
import PropTypes from 'prop-types';
export default function Currency({ lang }) {
  return <p className={s.currency}>{lang ? ' Currency' : 'Курс валют'}</p>;
}
Currency.propTypes = {
  lang: PropTypes.bool.isRequired,
};
