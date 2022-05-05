import { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import authOperations from './redux/auth/auth-operations';
import authSelectors from 'redux/auth/auth-selectors';
import globalSelectors from 'redux/global/global-selectors';
import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
import TransactionsTable from './components/transactionsTable';
import Loader from './components/loader/Loader';
import Statistics from 'components/statistics/statistics';
import Currency from 'components/money';
import '../src/assets/css/pageAnimation.css';
import Header from 'components/header';
import DashboardComponents from 'components/dashboardComponents';

const NotFoundPage = lazy(() => import('./pages/notFoundPage'));
const RegisterView = lazy(() => import('./pages/registrationPage'));
const LoginView = lazy(() => import('./pages/loginPage'));
const DashboardPage = lazy(() => import('./pages/dashboardPage'));

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isFetchingCurrentUser = useSelector(authSelectors.getFetchingCurrent);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isLoadingSpinner = useSelector(globalSelectors.isLoadingSpinner);
  useEffect(() => {
    if (location.pathname === '/wallet') {
      navigate('/wallet/transactions');
    }
  }, [location]);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  const routes = [
    { path: 'transactions', Component: TransactionsTable },
    { path: 'stat', Component: Statistics },
    { path: 'exchange-rate', Component: Currency },
  ];
  return (
    <>
      {isFetchingCurrentUser ? (
        <Loader />
      ) : (
        <>
          <Suspense fallback={<Loader size={200} />}>
            {isLoggedIn && (
              <>
                <Header />
                <DashboardComponents />
              </>
            )}
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={1000}
                classNames="page"
                unmountOnExit
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PublicRoute restricted redirectTo="/wallet/transaction">
                        <LoginView />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute restricted>
                        <RegisterView />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute redirectTo="/wallet/transaction" restricted>
                        <LoginView />
                      </PublicRoute>
                    }
                  />

                  <Route
                    path="/wallet/"
                    element={
                      <PrivateRoute redirectTo="/login">
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  >
                    {routes.map(({ path, Component }) => (
                      <Route
                        key={location.key}
                        path={path}
                        element={
                          <PrivateRoute redirectTo="/login">
                            <Component />
                          </PrivateRoute>
                        }
                      ></Route>
                    ))}
                  </Route>
                  <Route
                    path="*"
                    element={
                      <PublicRoute restricted>
                        <NotFoundPage />
                      </PublicRoute>
                    }
                  />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </Suspense>
        </>
      )}
      <ToastContainer autoClose={3000} />
      {isLoadingSpinner && <Loader />}
    </>
  );
}
