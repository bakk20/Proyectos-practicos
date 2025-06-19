import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

export const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};