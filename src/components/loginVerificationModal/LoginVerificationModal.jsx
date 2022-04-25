import s from './LoginVerificationModal.module.css';
import PropTypes from 'prop-types';
export default function LoginVerificationModal({ lang, handleClose }) {
  return (
    <div className={s.loginVerificationModal}>
      <p>
        {lang
          ? 'You received a PIN-code to confirm the entrance to the application. Please check your mail and enter the code in the field below.'
          : 'Вам на почту пришел PIN-код для подтверждения входа в приложение.Проверьте, пожалуйста, свой почтовый ящик и введите код в поле ниже.'}
      </p>

      <input
        type="text"
        name="pinCode"
        id="pinCode"
        placeholder="PIN-код"
        className={s.loginVerificationModal__input}
      />
      <button
        type="submit"
        className={s.loginVerificationModal__button}
        onSubmit={() => {
          handleClose();
        }}
      >
        {lang ? 'Confirm' : 'Отправить'}
      </button>
      <button
        type="button"
        className={s.loginVerificationModal__button}
        onClick={handleClose()}
      >
        {lang ? 'Cancel' : 'Отмена'}
      </button>
    </div>
  );
}
LoginVerificationModal.propTypes = {
  lang: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
