import Transaction from "components/transaction";
import Loader from "../../components/loader";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "../../redux/auth/auth-selectors";
import globalSelectors from "../../redux/global/global-selectors";
import { setPage } from "../../redux/transactions/transaction-actions";
import transactionsOperations from "../../redux/transactions/transaction-operations";
import {
  getCurrentPage,
  getPagesQuantity,
  getTransactions,
  getTransactionsExistingStatus,
} from "../../redux/transactions/transaction-selectors";
import s from "./TransactionsTable.module.css";

export default function TransactionsTable() {
  const userName = useSelector(authSelectors.getUsername);
  const isTransactionsLoaded = useSelector(globalSelectors.isLoadingSpinner);
  const areTransactionsExist = useSelector(getTransactionsExistingStatus);
  const transactions = useSelector(getTransactions);
  const page = useSelector(getPagesQuantity) || 1;
  const { t } = useTranslation();
  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsOperations.fetchTransactions(currentPage));
  }, [dispatch, currentPage]);

  const setNextPage = () => dispatch(setPage(currentPage + 1));
  const setPreviousPage = () => dispatch(setPage(currentPage - 1));

  return areTransactionsExist ? (
    <>
      {isTransactionsLoaded && <Loader size={200} />}
      <table className={s.table}>
        <thead className={s.table_header}>
          <tr key="asd" className={s.table_header_row}>
            <th className={s.ths}>{t("transactionsTableDate")}</th>
            <th className={s.ths}>{t("transactionsTableType")}</th>
            <th className={s.ths}>{t("transactionsTableCategory")}</th>
            <th className={s.ths}>{t("transactionsTableComment")}</th>
            <th className={s.ths}>{t("transactionsTableAmount")}</th>
            <th className={s.ths}>{t("transactionsTableBalance")}</th>
          </tr>
        </thead>
        <tbody className={s.table_body}>
          {transactions.map(
            ({ _id, date, type, category, comment, amount, balance }) => {
              const isPositive = type === "+";
              return (
                <tr
                  key={_id}
                  className={`${s.table_row} + ${
                    isPositive ? s.table_row_green : s.table_row_red
                  }`}
                >
                  <Transaction
                    date={date}
                    type={type}
                    category={category}
                    comment={comment}
                    amount={amount}
                    balance={balance}
                  />
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className={s.arrowsBtnWrap}>
        <button
          className={s.loadLessButton}
          type="button"
          name="loadLess"
          disabled={currentPage === 1}
          onClick={setPreviousPage}
        ></button>
        <button
          className={s.loadMoreButton}
          type="button"
          name="loadMore"
          disabled={currentPage === page}
          onClick={setNextPage}
        ></button>
      </div>
    </>
  ) : (
    <div className={s.greetings}>
      <h2>{`${t("transactionsTableTitle")}, ${userName}!`}</h2>
      <p>{t("transactionsTableFirstParagraph")}</p>
      <p>{`${userName}, ${t("transactionsTableSecondParagraph")}`}</p>
      <p>{t("transactionsTableThirdParagraph")}</p>
    </div>
  );
}
