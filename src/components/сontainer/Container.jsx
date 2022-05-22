import s from './Container.module.css';

const Container = ({ children, additionalClasses = [], nodeRef }) => {
  const classes = [s.container, ...additionalClasses];

  return <div ref={nodeRef} className={classes.join(' ')}>{children}</div>;
};

export default Container;
