import s from './BackgroundContainer.module.css';

const BackgroundContainer = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default BackgroundContainer;
