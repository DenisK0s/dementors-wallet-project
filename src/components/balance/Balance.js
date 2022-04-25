import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getBalance } from 'redux/transactions/transaction-selectors';
import s from './Balance.module.css';
export default function Balance({ lang }) {
  const balance = useSelector(getBalance);


  return (
    <>
      <div className={s.container}>
        <span className={s.text}>{lang ? 'YOUR BALANCE' : 'ВАШ БАЛАНС'}</span>
        <p className={s.balance}>
          ₴<span className={s.amount}>{balance || '0.00'}</span>{' '}
        </p>
      </div>
    </>
  );
}
Balance.propTypes = {
  lang: PropTypes.bool.isRequired,
};
