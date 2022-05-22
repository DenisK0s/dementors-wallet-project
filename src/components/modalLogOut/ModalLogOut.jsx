import s from './ModalLogOut.module.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import logOut from '../../redux/auth/auth-operations';
import modalActions from 'redux/global/global-actions';
import { useTranslation } from 'react-i18next';
export default function ModalLogOut({ handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <p>{t('modalLogOutQuestion')}</p>
      <div className={s.btnWrap}>
        <button
          type="button"
          className={s.cancelBtn}
          onClick={() => {
            handleClose();
            dispatch(modalActions.modalLogOutClose());
          }}
        >
          {t('modalLogOutCancelBtn')}
        </button>
        <button
          type="button"
          className={s.acceptBtn}
          onClick={() => {
            handleClose();
            dispatch(modalActions.modalLogOutClose());
            dispatch(logOut.logOut());
          }}
        >
          {t('modalLogOutAcceptBtn')}
        </button>
      </div>
    </>
  );
}
ModalLogOut.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
