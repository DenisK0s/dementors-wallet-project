import React, { useEffect, useState } from 'react';
import animationStyles from '../../assets/css/appearAnimation.module.css';
import { CSSTransition } from 'react-transition-group';
import s from './RegistrationPage.module.css';
import RegistrationForm from '../../components/registrationForm';
import BackgroundContainer from 'components/backgroundContainer/BackgroundContainer';

const RegistrationPage = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      return setAnimation(true), 200;
    });
  });
  return (
    <BackgroundContainer>
      <div className={s.wrapper}>
        <div className={s.box}>
          <CSSTransition
            in={animation}
            timeout={1000}
            classNames={animationStyles}
            unmountOnExit
          >
            <p className={s.title}>Finance App</p>
          </CSSTransition>
        </div>
        <CSSTransition
          in={animation}
          timeout={1000}
          classNames={animationStyles}
          unmountOnExit
        >
          <RegistrationForm />
        </CSSTransition>
        <div className={s.ellipseBlur} />
      </div>
    </BackgroundContainer>
  );
};

export default RegistrationPage;
