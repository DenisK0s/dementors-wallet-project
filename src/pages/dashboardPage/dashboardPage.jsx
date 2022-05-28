import Container from 'components/сontainer/Container';
import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './dashboardPage.module.css';

const DashboardPage = () => {
  return (
    <>
      <Container>
        <main className={s.main}>
          {<article className={s.box}>{<Outlet />}</article>}
        </main>
      </Container>
    </>
  );
};

export default DashboardPage;
