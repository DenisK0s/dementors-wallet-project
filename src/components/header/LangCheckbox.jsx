import classNames from "classnames";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import globalActions from "../../redux/global/global-actions";
import { useTranslation } from "react-i18next";
import globalSelectors from "../../redux/global/global-selectors";
export default function LangCheckbox() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { changeLanguage } = globalActions;
  const lang = useSelector(globalSelectors.lang);
  // console.log(lang);
  const handleCheckbox = (e) => {
    return e.target.checked === true
      ? (dispatch(changeLanguage(true)), i18n.changeLanguage("en"))
      : (dispatch(changeLanguage(false)), i18n.changeLanguage("ru"));
  };
  return (
    <div className={s.checkboxWrap}>
      <label htmlFor="lang">
        <div className={classNames(s.button, s.r)} id={"button-2"}>
          <input
            type="checkbox"
            className={s.checkbox}
            name="lang"
            checked={lang}
            onChange={handleCheckbox}
          />
          <div className={s.knobs}></div>
          <div className={s.layer}></div>
        </div>
      </label>
    </div>
  );
}
