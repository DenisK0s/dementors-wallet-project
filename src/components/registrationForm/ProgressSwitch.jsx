import PropTypes from "prop-types";
import ProgressBar from "../progressBar";
import { useTranslation } from "react-i18next";

export default function ProgressSwitch({ value }) {
  const { t } = useTranslation();
  if (value >= 0 && value < 6) {
    return <ProgressBar bgcolor="red" progress={0} />;
  }

  if (value === 6) {
    return <ProgressBar bgcolor="red" progress={100} text={t("progressSwitchWeak")} />;
  }
  if (value > 6 && value < 8) {
    return <ProgressBar bgcolor="orange" progress={200} text={t("progressSwitchNormal")} />;
  }
  if (value >= 8 && value < 10) {
    return <ProgressBar bgcolor="#37f3ca" progress={300} text={t("progressSwitchSecure")} />;
  }
  if (value >= 10) {
    return <ProgressBar bgcolor="#24cca7" progress={400} text={t("progressSwitchSecure100")} />;
  }
  return null;
}

ProgressSwitch.propTypes = {
  value: PropTypes.number,
};
