import LoginForm from "../../components/loginForm";
import BackgroundContainer from "components/backgroundContainer";
import React from "react";
import s from "../registrationPage/RegistrationPage.module.css";

const LoginPage = () => {
  return (
    <BackgroundContainer>
      <div className={s.wrapper}>
        <div className={`${s.box} ${s.picture}`}>
          <p className={s.title}>Finance App</p>
        </div>
        <LoginForm />
        <div className={s.ellipseBlur}></div>
      </div>
    </BackgroundContainer>
  );
};

export default LoginPage;
