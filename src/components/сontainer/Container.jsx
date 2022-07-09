import PropTypes from "prop-types";
import s from "./Container.module.css";

const Container = ({ children, additionalClasses = [] }) => {
  const classes = [s.container, ...additionalClasses];

  return <div className={classes.join(" ")}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
  additionalClasses: PropTypes.array,
};

export default Container;
