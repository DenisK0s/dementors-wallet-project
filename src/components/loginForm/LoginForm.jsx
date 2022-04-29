import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import s from './LoginForm.module.css';
import LangCheckbox from 'components/header/LangCheckbox';
import TextInput from '../textInput';
import Logo from '../logo';
import { ReactComponent as EmailIcon } from '../../assets/images/icons/email.svg';
import { ReactComponent as LockIcon } from '../../assets/images/icons/lock.svg';
import authOperations from '../../redux/auth/auth-operations';
import { useTranslation } from 'react-i18next';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .min(6, 'минимум 6 символов!')
    .max(30, 'Не больше 30 символов!!')
    .required('Обязательное поле'),
  password: Yup.string()
    .typeError('Должно быть строкой')
    .min(6, 'минимум 6 символов!')
    .max(12, 'Не больше 12 символов!')
    .required('Обязательное поле'),
});
export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSubmit = user => {
    dispatch(authOperations.logIn(user));
  };
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);

          resetForm();
        }}
        validationSchema={SignupSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <Form className={s.formRegister}>
            <div className={s.formTitleWrap}>
              <Logo className={s.logo} />
              <div className={s.checkbox}>
                <LangCheckbox />
              </div>
            </div>
            <div className={classNames(s.input_wrap, s.inputTop)}>
              {touched.email && errors.email && (
                <span className={s.error}>{errors.email}</span>
              )}
              <TextInput
                label={<EmailIcon className={s.icon} />}
                placeholder={t('registerFormEmail')}
                className={s.input}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            <div className={s.input_wrap}>
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
              <TextInput
                label={<LockIcon className={s.icon} />}
                className={s.input}
                placeholder={t('registerFormPassword')}
                type={`password`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            <button
              className={s.btn}
              disabled={!isValid || !dirty}
              type={`submit`}
            >
              {t('registerFormLoginBtn')}
            </button>
            <Link
              to="/register"
              className={s.btn1}
              style={{ textDecoration: 'none' }}
            >
              {t('registerFormSignupBtn')}
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
