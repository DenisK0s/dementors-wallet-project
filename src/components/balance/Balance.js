import { useSelector } from 'react-redux';
import { getBalance } from 'redux/transactions/transaction-selectors';
import { useTranslation } from 'react-i18next';
import s from './Balance.module.css';

export default function Balance() {
  const { t } = useTranslation();
  const balance = useSelector(getBalance);

  return (
    <>
      <div className={s.container}>
        <span className={s.text}>{t('balanceTitle')}</span>
        <p className={s.balance}>
          ₴<span className={s.amount}>{balance || '0.00'}</span>{' '}
        </p>
      </div>
    </>
  );
}
