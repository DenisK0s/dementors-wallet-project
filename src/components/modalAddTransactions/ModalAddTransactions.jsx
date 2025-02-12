import PropTypes from "prop-types";
import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import closeBtnIcon from "../../assets/images/icons/close.svg";
import modalActions from "../../redux/global/global-actions";
import "moment/locale/ru";
import "moment/locale/en-au";
import transactionsOperations from "../../redux/transactions/transaction-operations";
import "./ModalAddTransactions.module.css";
import s from "./ModalAddTransactions.module.css";
import TransactionsCategoriesSelect from "./TransactionsCategoriesSelect";
import categoriesSelectors from "../../redux/categories/categories-selectors";
import globalSelectors from "../../redux/global/global-selectors";
import * as yup from "yup";
import categoriesOperations from "../../redux/categories/categories-operations";
import { useTranslation } from "react-i18next";

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

export default function ModalAddTransactions({ lang, handleClose }) {
  const [date, setDate] = useState(currentDate);
  const [dateFiltr, setDateFiltr] = useState(new Date(today).getTime());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("+");
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const categories = useSelector(categoriesSelectors.getCategories);
  const isEnglish = useSelector(globalSelectors.lang);

  const defaultCommentText = isEnglish ? "No comment" : "Нет комментария";
  let schema = yup.object().shape({
    type: yup.string().default("+").required(t("modalAddTransactionValType")),
    amount: yup.string().max(10).default("0.00").required(t("modalAddTransactionValAmount")),

    date: yup
      .string()
      .default(function () {
        const today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        let currentDate = dd + "." + mm + "." + yyyy;
        return currentDate;
      })
      .required(),
    comment: yup.string().max(15, t("modalAddTransactionValCommentMax")),
    newCategory: yup.string().max(15, t("modalAddTransactionValNewCategoryMax")),
  });
  const handleCheckbox = (e) => {
    e.target.checked === true ? setTransactionType("-") : setTransactionType("+");
  };

  const onChangeCategory = (e) => {
    return e === null ? setCategory("") : setCategory(e.value);
  };

  const getDate = (e) => {
    return (
      setDate(
        `${String(e.date()).padStart(2, "0")}.${String(e.month() + 1).padStart(2, "0")}.${e.year()}`
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
      toast.warn(t("modalAddTransactionErrorMsg"), {
        autoClose: 5000,
        pauseOnHover: true,
      });
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
            comment: values.comment || defaultCommentText,
            category,
            newCategory,
          };
          const reset2 = {
            type: transactionType,
            amount: amountForSending(amount),
            date: date ? date : currentDate,
            comment: values.comment || defaultCommentText,
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
        }}>
        <Form autoComplete="off">
          <button
            type="button"
            onClick={() => {
              handleClose();
              dispatch(modalActions.modalAddTransactionClose());
            }}
            className={s.closeBtn}>
            <img src={closeBtnIcon} alt="Close" />
          </button>
          <p className={s.title}>{t("modalAddTransactionTitle")}</p>
          <div className={s.checkboxWrap}>
            <span
              className={
                transactionType === "+" ? classNames(s.incomes, s.incomesActive) : s.incomes
              }>
              {t("modalAddTransactionIncomesType")}
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
                transactionType === "-" ? classNames(s.outcomes, s.outcomesActive) : s.outcomes
              }>
              {t("modalAddTransactionOutcomesType")}
            </span>
          </div>
          <Field
            type="text"
            name="newCategory"
            placeholder={t("modalAddTransactionNewCategory")}
            disabled={category}
            maxLength="15"
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
              inputProps={{ readOnly: true }}
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
            placeholder={t("modalAddTransactionComment")}
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
              }}>
              {t("modalAddTransactionAcceptBtn")}
            </button>
            <button
              type="button"
              className={s.cancelBtn}
              onClick={() => {
                handleClose();
                dispatch(modalActions.modalAddTransactionClose());
              }}>
              {t("modalAddTransactionCancelBtn")}
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
