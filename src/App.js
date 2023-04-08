import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Loader from './components/Loader/Loader';

import DashboardPage from './pages/DashboardPage';
import Dashboard from './components/Dashboard';
import Currency from './components/Currency';
import TransactionMobile from './components/TransactionMobile';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { userOperations } from './redux/user';
import { useMediaQuery } from '@mui/material';
import { userSelectors } from './redux/user';
import { transactionsSelectors } from './redux/transactions';

const LoginPage = lazy(() => import('./pages/LoginPage'));

const RegisterPage = lazy(() => import('./pages/RegisterPage'));

function App() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:768px)');
  useEffect(() => dispatch(userOperations.fetchCurrentUser()), [dispatch]);
  const isLoadingSession = useSelector(userSelectors.getUserIsLoading);
  const isLoadingTransactions = useSelector(transactionsSelectors.getIsLoading);
  const showLoader = isLoadingSession || isLoadingTransactions;

  return (
    <>
      {showLoader && <Loader />}
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute restricted redirectTo="/home">
                <Navigate to="/login" />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted redirectTo="/home">
                <Suspense fallback={<Loader />}>
                  <LoginPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute restricted redirectTo="/home">
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              </PublicRoute>
            }
          />
          {!matches && (
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute>
                    <TransactionMobile />
                  </PrivateRoute>
                }
              />

              <Route
                path="chart"
                element={
                  <PrivateRoute>
                    <Dashboard chart />
                  </PrivateRoute>
                }
              />
              <Route
                path="currency"
                element={
                  <PrivateRoute>
                    <Currency />
                  </PrivateRoute>
                }
              />
            </Route>
          )}
          {matches && (
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="chart"
                element={
                  <PrivateRoute>
                    <Dashboard chart />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
}

export default App;
