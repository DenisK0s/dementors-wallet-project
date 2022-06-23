import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const CustomIdicatorArrowIcon = ({ width, height, fill = "none", stroke }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 11"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L10 10L19 1" stroke={stroke} />
    </svg>
  );
};

CustomIdicatorArrowIcon.propTypes = propTypes;

export default CustomIdicatorArrowIcon;
