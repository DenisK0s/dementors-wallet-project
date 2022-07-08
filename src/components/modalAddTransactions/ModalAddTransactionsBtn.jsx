import s from "./ModalAddTransactions.module.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import btnIcon from "../../assets/images/icons/+.svg";
import modalActions from "../../redux/global/global-actions";
export default function ModalAddTransactionsBtn() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isButtonInvisible = location.pathname === "/wallet/stat";

  const handleOpen = () => {
    dispatch(modalActions.openModal());
  };
  return (
    <button
      className={isButtonInvisible ? s.btnNone : s.btn}
      onClick={() => {
        dispatch(modalActions.modalLogOutClose());
        dispatch(modalActions.modalAddTransactionOpen());
        handleOpen();
      }}>
      <img src={btnIcon} alt="Click here to add a transaction" className={s.btnIcon} />
    </button>
  );
}
