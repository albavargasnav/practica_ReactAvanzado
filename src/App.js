import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdvertsPage from './components/adverts/AdvertsPage';
import NewAdvertPage from './components/adverts/NewAdvertPage';
import AdvertPage from './components/adverts/AdvertPage';
import RequireAuth from './components/auth/RequireAuth';
import './App.css';

const LoginPage = lazy(() => import('./components/auth/LoginPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adverts" element={<AdvertsPage />} />
          <Route path="/adverts/:Id" element={<AdvertPage />} />
          <Route
            path="/adverts/new"
            element={
              <RequireAuth>
                <NewAdvertPage />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="/404" element={<div>404 | Not found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
