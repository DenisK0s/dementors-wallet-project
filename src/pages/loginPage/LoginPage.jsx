import LoginForm from '../../components/loginForm';
import BackgroundContainer from 'components/backgroundContainer';
import React, { useEffect, useState } from 'react';
import s from '../registrationPage/RegistrationPage.module.css';
import animationStyles from '../../assets/css/appearAnimation.module.css';
import { CSSTransition } from 'react-transition-group';

const LoginPage = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    return setAnimation(true);
  }, [animation]);
  return (
    <BackgroundContainer>
      <div className={s.wrapper}>
        <div className={`${s.box} ${s.picture}`}>
          <CSSTransition
            in={animation}
            timeout={1200}
            classNames={animationStyles}
            unmountOnExit
          >
            <p className={s.title}>Finance App</p>
          </CSSTransition>
        </div>
        <CSSTransition
          in={animation}
          timeout={1200}
          classNames={animationStyles}
          unmountOnExit
        >
          <LoginForm />
        </CSSTransition>
        <div className={s.ellipseBlur}></div>
      </div>
    </BackgroundContainer>
  );
};

export default LoginPage;
