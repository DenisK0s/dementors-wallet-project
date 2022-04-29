import { Formik, Form } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import classNames from 'classnames';
import LangCheckbox from 'components/header/LangCheckbox';
import { useTranslation } from 'react-i18next';
import Logo from '../logo';
import TextInput from '../textInput';
import ProgressSwitch from './ProgressSwitch';
import s from './RegistrationForm.module.css';

import { ReactComponent as UserIcon } from '../../assets/images/icons/user.svg';
import { ReactComponent as EmailIcon } from '../../assets/images/icons/email.svg';
import { ReactComponent as LockIcon } from '../../assets/images/icons/lock.svg';

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректный Email')
    .min(6, 'минимум 6 символов!')
    .required('Обязательное поле'),
  password: Yup.string()
    .typeError('Должно быть строкой')
    .min(6, 'минимум 6 символов!')
    .max(12, 'Не больше 12 символов!')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  name: Yup.string()
    .typeError()
    .min(1, 'минимум 1 символа!')
    .max(12, 'Не больше 12 символов!')
    .required('Обязательное поле'),
});
export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = ({ name, email, password }) => {
    dispatch(authOperations.register({ name, email, password }));
  };
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          password: '',
          confirmPassword: '',
          email: '',
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
          navigate('/login');
        }}
        validationSchema={RegistrationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          dirty,
        }) => (
          <Form className={s.formRegister}>
            <div className={s.formTitleWrap}>
              <Logo />
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
                type="email"
                name="email"
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
                type="password"
                name="password"
                error={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            <div className={s.input_wrap}>
              {touched.confirmPassword && errors.confirmPassword && (
                <span className={s.error}>{errors.confirmPassword}</span>
              )}
              <TextInput
                label={<LockIcon className={s.icon} />}
                placeholder={t('registerFormConfirmPassword')}
                className={s.input}
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <ProgressSwitch value={values.password.length} />
            <div className={s.input_wrap}>
              {touched.name && errors.name && (
                <span className={s.error}>{errors.name}</span>
              )}
              <TextInput
                label={<UserIcon className={s.icon} />}
                placeholder={t('registerFormName')}
                className={s.input}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </div>
            <button
              className={s.btn}
              disabled={!isValid || !dirty}
              type="submit"
            >
              {t('registerFormSignupBtn')}
            </button>
            <NavLink
              to="/login"
              className={s.btn1}
              style={{ textDecoration: 'none' }}
            >
              {t('registerFormLoginBtn')}
            </NavLink>
          </Form>
        )}
      </Formik>
    </>
  );
}
