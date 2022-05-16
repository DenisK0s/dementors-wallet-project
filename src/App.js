import DashboardComponents from "components/dashboardComponents";
import Header from "components/header";
import Currency from "components/money";
import Statistics from "components/statistics";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import authSelectors from "redux/auth/auth-selectors";
import globalSelectors from "redux/global/global-selectors";
import "../src/assets/css/pageAnimation.css";
import Loader from "./components/loader/Loader";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import TransactionsTable from "./components/transactionsTable";
import authOperations from "./redux/auth/auth-operations";

const NotFoundPage = lazy(() => import("./pages/notFoundPage"));
const RegisterView = lazy(() => import("./pages/registrationPage"));
const LoginView = lazy(() => import("./pages/loginPage"));
const DashboardPage = lazy(() => import("./pages/dashboardPage"));

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isFetchingCurrentUser = useSelector(authSelectors.getFetchingCurrent);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isLoadingSpinner = useSelector(globalSelectors.isLoadingSpinner);

  useEffect(() => {
    if (location.pathname === "/wallet") {
      navigate("/wallet/transactions");
    }
  }, [location, navigate]);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  const routes = [
    { path: "transactions", Component: TransactionsTable },
    { path: "stat", Component: Statistics },
    { path: "exchange-rate", Component: Currency },
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
                timeout={600}
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
