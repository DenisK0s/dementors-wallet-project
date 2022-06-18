import BackgroundContainer from "components/backgroundContainer";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import animationStyles from "../../assets/css/appearAnimation.module.css";
import LoginForm from "../../components/loginForm";
import s from "../registrationPage/RegistrationPage.module.css";

const LoginPage = () => {
  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);
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
            nodeRef={nodeRef1}>
            <p className={s.title} ref={nodeRef1}>
              Finance App
            </p>
          </CSSTransition>
        </div>
        <CSSTransition
          in={animation}
          timeout={1200}
          classNames={animationStyles}
          unmountOnExit
          nodeRef={nodeRef2}>
          <LoginForm nodeRef={nodeRef2} />
        </CSSTransition>
        <div className={s.ellipseBlur}></div>
      </div>
    </BackgroundContainer>
  );
};

export default LoginPage;
