import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader({ extendedClassName }) {
  return (
    <div className={`${s.loaderWrap} ${extendedClassName}`}>
      <div className={s.loaderContent}>
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="#C5BAFF"
          secondaryColor="#FFD8D0"
        />
      </div>
    </div>
  );
}

Loader.propTypes = {
  extendedClassName: PropTypes.string,
};
