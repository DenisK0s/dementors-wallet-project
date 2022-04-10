
import React from "react";
import s from "./RegistrationPage.module.css";
// import RegistrationForm from "../../components/RegistrationForm";
import BackgroundContainer from "components/BackgroundContainer";

const RegistrationPage = () => {
  return (
    <BackgroundContainer>
      <div className={s.wrapper}>
        <p className={s.title}>Finance App</p>
        {/* <RegistrationForm /> */}
        <div className={s.box}>
          <p className={s.title}>Finance App</p>
        </div>
        {/* <RegistrationForm/> */}
        <div className={s.ellipseBlur} />
      </div>
    </BackgroundContainer>
  );
};

export default RegistrationPage;
