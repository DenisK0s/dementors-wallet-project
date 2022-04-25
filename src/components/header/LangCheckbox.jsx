import classNames from 'classnames';
import styles from '../modalAddTransactions/ModalAddTransactions.module.css';
import s from './Header.module.css';
import { useDispatch } from 'react-redux';
import modalActions from '../../redux/global/global-actions';
import PropTypes from 'prop-types';

export default function LangCheckbox({ lang }) {
  const dispatch = useDispatch();
  const { changeLanguage } = modalActions;
  const handleCheckbox = e => {
    e.target.checked === true
      ? dispatch(changeLanguage(true))
      : dispatch(changeLanguage(false));
  };
  return (
    <div className={classNames(styles.checkboxWrap, s.checkboxWrap)}>
      <span
        style={{ position: 'unset' }}
        className={
          lang === true
            ? classNames(styles.incomes, styles.incomesActive, s.incomes)
            : classNames(styles.incomes, s.incomes)
        }
      >
        English
      </span>
      <label htmlFor="lang">
        <div
          className={classNames(styles.button, styles.r, s.button, s.r)}
          id={'button-2'}
        >
          <input
            type="checkbox"
            className={classNames(styles.checkbox, s.checkbox)}
            name="lang"
            onClick={handleCheckbox}
          />

          <div className={classNames(styles.knobs, s.knobs)}></div>
          <div className={classNames(styles.layer, s.layer)}></div>
        </div>
      </label>
      <span
        style={{ position: 'unset' }}
        className={
          lang === false
            ? classNames(styles.outcomes, styles.outcomesActive, s.outcomes)
            : classNames(styles.outcomes, s.outcomes)
        }
      >
        Русский
      </span>
    </div>
  );
}
LangCheckbox.propTypes = {
  lang: PropTypes.bool.isRequired,
};
