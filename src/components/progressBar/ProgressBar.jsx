import React from "react";
import PropTypes from "prop-types";
import s from "./ProgressBar.module.css";

const Progress_bar = ({ bgcolor, progress, text }) => {
  const Progress = {
    marginBottom: "30px",
    borderRadius: "4px solid #E5F1EF",
  };

  const ProgressLine = {
    height: "4px",
    width: `${progress / 4}%`,
    backgroundColor: bgcolor,
    boxShadow: "0px 1px 8px rgba(36,204, 167, 0.5)",
    borderRadius: 40,
    textAlign: "right",
    outline: "none",
  };

  return (
    <div className={s.progress} style={Progress}>
      <div style={ProgressLine} className={s.progres__wrap}>
        <span className={s.progres__text}>{text}</span>
      </div>
    </div>
  );
};

Progress_bar.propTypes = {
  bgcolor: PropTypes.string,
  progress: PropTypes.number,
  text: PropTypes.string,
};

export default Progress_bar;
