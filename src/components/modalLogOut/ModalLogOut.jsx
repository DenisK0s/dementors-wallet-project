import s from './ModalLogOut.module.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import logOut from '../../redux/auth/auth-operations';
import modalActions from 'redux/global/global-actions';
export default function ModalLogOut({ handleClose, lang }) {
  const dispatch = useDispatch();
  return (
    <>
      <p>
        {lang
          ? 'Are you sure you want to exit the app?'
          : 'Вы действительно хотите выйти?'}
      </p>
      <div className={s.btnWrap}>
        <button
          type="button"
          className={s.cancelBtn}
          onClick={() => {
            handleClose();
            dispatch(modalActions.modalLogOutClose());
          }}
        >
          {lang ? 'No' : 'Нет'}
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
          {lang ? 'Yes' : 'Да'}
        </button>
      </div>
    </>
  );
}
ModalLogOut.propTypes = {
  handleClose: PropTypes.func.isRequired,
  lang: PropTypes.bool.isRequired,
};
