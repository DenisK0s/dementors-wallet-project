import Nav from "components/nav/Nav";
import Currency from "../money";
import Balance from "components/balance/Balance";
import Container from "components/сontainer/Container";
import React, { Fragment, useEffect, useState } from "react";
import Media from "react-media";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import s from "./DashbordComponents.module.css";
import Modal from "../modal";
import { ModalAddTransactionsBtn } from "../modalAddTransactions";
import categoriesSelectors from "../../redux/categories/categories-selectors";
import authSelectors from "../../redux/auth/auth-selectors";
import globalSelectors from "../../redux/global/global-selectors";
import transactionsOperations from "../../redux/transactions/transaction-operations";
import statisticsOperations from "../../redux/statistics/statistics-operations";
import categoriesOperations from "../../redux/categories/categories-operations";

export default function DashboardComponents() {
  const [display, setDisplay] = useState();
  const lang = useSelector(globalSelectors.lang);
  const isModalOpen = useSelector(globalSelectors.isModalOpen);
  const test = useSelector(categoriesSelectors.getCategories);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplay(path === "exchange-rate" ? true : false);
  }, [path]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(categoriesOperations.getCategories());
    }
    dispatch(transactionsOperations.fetchTransactions());
    dispatch(statisticsOperations.getStatistics({}));
  }, []);
  return (
    <>
      <Container>
        <div className={s.wrapper}>
          <section className={s.nav}>
            <Nav />
          </section>
          <Media
            queries={{
              mobile: { maxWidth: 767 },
              other: { minWidth: 768 },
            }}>
            {(matches) => {
              return (
                <Fragment>
                  {matches.mobile && (
                    <>
                      {display ? (
                        <section className={s.currency}>{<Currency />}</section>
                      ) : (
                        <>
                          <Balance />
                        </>
                      )}
                    </>
                  )}
                  {matches.other && (
                    <>
                      <aside className={s.aside}>
                        <Balance />
                        <section className={s.currency}>
                          <Currency />
                        </section>
                      </aside>
                    </>
                  )}
                </Fragment>
              );
            }}
          </Media>
        </div>
        <div className={s.addTransactionBtn}>
          <ModalAddTransactionsBtn />
        </div>
        {isModalOpen && <Modal lang={lang} categoriesTest={test} />}
      </Container>
    </>
  );
}
