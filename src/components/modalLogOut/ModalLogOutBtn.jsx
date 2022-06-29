import s from "./ModalLogOut.module.css";
import { useDispatch } from "react-redux";
import modalActions from "redux/global/global-actions";
import style from "../header/Header.module.css";
import { ReactComponent as ExitIcon } from "assets/images/icons/exit.svg";
import { useTranslation } from "react-i18next";
export default function ModalLogOutBtn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(modalActions.openModal());
  };
  return (
    <button
      className={s.logOutBtn}
      onClick={() => {
        dispatch(modalActions.modalAddTransactionClose());
        dispatch(modalActions.modalLogOutOpen());
        handleOpen();
      }}>
      <ExitIcon className={style.exitIcon} />
      <span className={style.logOutBtnText}>{t("headerExitBtn")}</span>
    </button>
  );
}
