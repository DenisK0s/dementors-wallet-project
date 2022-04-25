import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import closeBtnIcon from "../../assets/images/icons/close.svg";
import modalActions from "../../redux/global/global-actions";
import PropTypes from "prop-types";
import "moment/locale/ru";
import "moment/locale/en-au";
import transactionsOperations from "../../redux/transactions/transaction-operations";
import "./ModalAddTransactions.module.css";
import s from "./ModalAddTransactions.module.css";
import TransactionsCategoriesSelect from "./TransactionsCategoriesSelect";
import categoriesSelectors from "../../redux/categories/categories-selectors";
import schema from "./Schema";
import categoriesOperations from "../../redux/categories/categories-operations";
const today = new Date();

var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
let currentDate = dd + "." + mm + "." + yyyy;

const initialValues = {
  type: "",
  amount: "",
  date: "",
  comment: "",
  category: "",
};

export default function ModalAddTransactions({
  handleClose,
  lang,
  testCategory,
}) {
  const [date, setDate] = useState(currentDate);
  const [dateFiltr, setDateFiltr] = useState(new Date(today).getTime());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("-");
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.getCategories);

  const handleCheckbox = (e) => {
    e.target.checked === true
      ? setTransactionType("+")
      : setTransactionType("-");
  };

  const onChangeCategory = (e) => {
    return e === null ? setCategory("") : setCategory(e.value);
  };

  const getDate = (e) => {
    return (
      setDate(
        `${String(e.date()).padStart(2, "0")}.${String(e.month() + 1).padStart(
          2,
          "0"
        )}.${e.year()}`
      ),
      setDateFiltr(new Date(e).getTime())
    );
  };

  const addCategory = (e) => {
    setNewCategory(e.target.value);
  };
  const amountChange = (e) => {
    return setAmount(e.target.value);
  };
  const amountForSending = (amount) => {
    if (Number.isInteger(Number(amount)) === true) {
      return amount + ".00";
    } else return amount;
  };
  const errorMsg = () => {
    dateFiltr < new Date(today).getTime() &&
      toast.warn(
        lang
          ? "The process of adding a transaction can take a little more time because of you add an old transaction."
          : "Операция добавления может занять немного больше времени из-за того, что это транзакция добавлена задним числом.",
        { autoClose: 5000, pauseOnHover: true }
      );
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          const reset = {
            type: transactionType,
            amount: amountForSending(amount),
            date: date ? date : currentDate,
            comment: values.comment || "Нет комментария",
            category,
            newCategory,
          };
          const reset2 = {
            type: transactionType,
            amount: amountForSending(amount),
            date: date ? date : currentDate,
            comment: values.comment || "Нет комментария",
            category,
          };
          const result = newCategory ? reset : reset2;
          errorMsg();
          dispatch(transactionsOperations.addTransaction(result));

          dispatch(categoriesOperations.getCategories());
          setAmount("");
          setCategory("");
          setDate("");
          setTransactionType("-");
          resetForm();
          handleClose();
        }}
      >
        <Form autoComplete="off">
          <button
            type="button"
            onClick={() => {
              handleClose();
              dispatch(modalActions.modalAddTransactionClose());
            }}
            className={s.closeBtn}
          >
            <img src={closeBtnIcon} alt="Close" />
          </button>
          <p className={s.title}>Добавить транзакцию</p>
          <div className={s.checkboxWrap}>
            <span
              className={
                transactionType === "+"
                  ? classNames(s.incomes, s.incomesActive)
                  : s.incomes
              }
            >
              {lang ? "Incomes" : "Доход"}
            </span>
            <label htmlFor="transactionType">
              <div className={classNames(s.button, s.r)} id={"button-2"}>
                <Field
                  type="checkbox"
                  className={s.checkbox}
                  name="type"
                  onClick={handleCheckbox}
                />

                <ErrorMessage
                  name="type"
                  render={(msg) => {
                    return toast(msg, { toastId: "" });
                  }}
                />
                <div className={classNames(s.knobs, s.knobsTransactions)}></div>
                <div className={s.layer}></div>
              </div>
            </label>
            <span
              className={
                transactionType === "-"
                  ? classNames(s.outcomes, s.outcomesActive)
                  : s.outcomes
              }
            >
              {lang ? "Outcomes" : "Расход"}
            </span>
          </div>
          <Field
            type="text"
            name="newCategory"
            placeholder={
              lang ? "Name of the new category" : "Название новой категории"
            }
            disabled={category}
            className={s.newCategory}
            onChange={addCategory}
          />
          <ErrorMessage
            name="newCategory"
            render={(msg) => {
              return toast(msg, { toastId: "" });
            }}
          />
          <TransactionsCategoriesSelect
            onChange={onChangeCategory}
            lang={lang}
            newCategory={newCategory}
            type={transactionType}
            categories={categories}
          />
          <div className={s.sumAndDateWrap}>
            <Field
              type="number"
              name="amount"
              className={s.sumInput}
              placeholder="0.00"
              value={amount}
              min="0"
              required
              onChange={amountChange}
            />
            <ErrorMessage
              name="amount"
              render={(msg) => {
                return toast(msg, { toastId: "" });
              }}
            />
            <Datetime
              dateFormat="DD.MM.YYYY"
              timeFormat={false}
              className={s.datetime}
              initialValue={currentDate}
              closeOnSelect={true}
              name="date"
              locale={lang ? "en" : "ru"}
              onChange={getDate}
            />
            <ErrorMessage
              name="date"
              render={(msg) => {
                return toast(msg, { toastId: "" });
              }}
            />
          </div>
          <Field
            type="text"
            name="comment"
            placeholder={lang ? "Comment" : "Комментарий"}
            className={s.commentInput}
          />

          <ErrorMessage
            name="comment"
            render={(msg) => {
              return toast(msg, { toastId: "" });
            }}
          />
          <div className={s.btnWrap}>
            <button
              type="submit"
              className={s.acceptBtn}
              onSubmit={() => {
                handleClose();
                dispatch(modalActions.modalAddTransactionClose());
              }}
            >
              {lang ? "Add" : "Добавить"}
            </button>
            <button
              type="button"
              className={s.cancelBtn}
              onClick={() => {
                handleClose();
                dispatch(modalActions.modalAddTransactionClose());
              }}
            >
              {lang ? "Cancel" : "Отмена"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
ModalAddTransactions.propTypes = {
  handleClose: PropTypes.func.isRequired,
  lang: PropTypes.bool.isRequired,
};
