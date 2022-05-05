import Nav from 'components/nav/Nav';
import Currency from '../money';
import Balance from 'components/balance/Balance';
import Container from 'components/сontainer/Container';
import categoriesOperations from '../../redux/categories/categories-operations';
import React, { Fragment, useEffect, useState } from 'react';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from '../../pages/dashboardPage/dashboardPage.module.css';
import Modal from '../modal';
import { ModalAddTransactionsBtn } from '../modalAddTransactions';
import categoriesSelectors from '../../redux/categories/categories-selectors';
import globalSelectors from '../../redux/global/global-selectors';

export default function DashboardComponents() {
  const [display, setDisplay] = useState();
  const lang = useSelector(globalSelectors.lang);
  const isModalOpen = useSelector(globalSelectors.isModalOpen);
  const test = useSelector(categoriesSelectors.getCategories);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    setDisplay(path === 'exchange-rate' ? true : false);
    dispatch(categoriesOperations.getCategories());
  }, [path, dispatch]);
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
            }}
          >
            {matches => {
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
