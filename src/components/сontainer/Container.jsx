import s from './Container.module.css';

const Container = ({ children, additionalClasses = [] }) => {
  const classes = [s.container, ...additionalClasses];

  return <div className={classes.join(' ')}>{children}</div>;
};

export default Container;
