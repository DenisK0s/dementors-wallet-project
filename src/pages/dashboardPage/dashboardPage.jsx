import Container from 'components/сontainer/Container';
import React, { Fragment, useEffect, useState } from 'react';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import categoriesSelectors from 'redux/categories/categories-selectors';
import globalSelectors from 'redux/global/global-selectors';
import Balance from '../../components/balance';
import Header from '../../components/header';
import Modal from '../../components/modal';
import { ModalAddTransactionsBtn } from '../../components/modalAddTransactions';
import Currency from '../../components/money';
import Nav from '../../components/nav';
import categoriesOperations from '../../redux/categories/categories-operations';
// import transactionsOperations from "../../redux/transactions/transaction-operations";
import s from './dashboardPage.module.css';
// import categoriesSelectors from '../../redux/categories/categories-selectors';

const DashboardPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState();
  const dispatch = useDispatch();
  const lang = useSelector(globalSelectors.lang);
  const isModalOpen = useSelector(globalSelectors.isModalOpen);
  const test = useSelector(categoriesSelectors.getCategories);
  useEffect(() => {
    setDisplay(path === '/exchange-rate' ? true : false);
    dispatch(categoriesOperations.getCategories());
    // dispatch(transactionsOperations.fetchTransactions());
  }, [path, dispatch]);

  //   useEffect(() => {
  //     dispatch(operations.fetchCurrentUser());
  //   }, [dispatch]);
  return (
    <>
      <Header />
      <Container>
        <div className={s.wrapper}>
          <main className={s.main}>
            {
              <Media
                queries={{
                  mobile: { maxWidth: 767 },
                  other: { minWidth: 768 },
                }}
              >
                {matches => {
                  return (
                    <Fragment>
                      {matches.mobile && (
                        <>
                          <section className={s.nav}>
                            <Nav />
                          </section>
                          {display ? (
                            <section className={s.currency}>
                              <Currency />
                            </section>
                          ) : (
                            <>
                              <Balance />
                              <article className={s.box}>
                                <Outlet />
                              </article>
                            </>
                          )}
                        </>
                      )}
                      {matches.other && (
                        <>
                          <aside className={s.aside}>
                            <section className={s.nav}>
                              <Nav />
                            </section>
                            <Balance />
                            <section className={s.currency}>
                              <Currency />
                            </section>
                          </aside>
                          <article className={s.box}>
                            <Outlet />
                          </article>
                        </>
                      )}
                    </Fragment>
                  );
                }}
              </Media>
            }
          </main>
          <div className={s.addTransactionBtn}>
            <ModalAddTransactionsBtn />
          </div>
        </div>
        {isModalOpen && <Modal lang={lang} categoriesTest={test} />}
      </Container>
    </>
  );
};

export default DashboardPage;
