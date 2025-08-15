import { useEffect, useState } from 'react'
import {Router,Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import { LoginScreen } from './front-end/pages/LoginScreen'
import { RegisterScreen } from './front-end/pages/RegisterScreen'
import { MainScreen } from './front-end/pages/MainScreen'
import { useAuth } from './front-end/context/AuthProvider'
import { AdminPanel } from './front-end/pages/AdminPanel'
import { Layout } from './front-end/Layout/Layout'
import { CheckToken } from './front-end/utils/TokenWatcher'
import { jwtDecode } from 'jwt-decode'


export const App = () =>{
const { token } = useAuth();
const [isAdmin, setIsAdmin] = useState<boolean>(false);
const [loggedIn, setLoggedIn] = useState<boolean>(false);
const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

const checkToken = () => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    setLoggedIn(false);
    setIsAdmin(false);
    setLoadingAuth(false);
    return;
  }

  try {
    const decoded = jwtDecode(storedToken) as { id?: string; role?: string; exp?: number };

    if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
      console.warn("Token expirado, cerrando sesión...");
      localStorage.removeItem("token");
      setLoggedIn(false);
      setIsAdmin(false);
      setLoadingAuth(false);
      return;
    }

    setLoggedIn(!!decoded?.id);
    setIsAdmin(decoded?.role === "admin");
  } catch (err) {
    console.error("Token inválido:", err);
    setLoggedIn(false);
    setIsAdmin(false);
  }

  setLoadingAuth(false);
};

// Efecto 1: verificación continua
useEffect(() => {
  checkToken(); // Inicial
  const intervalId = setInterval(checkToken, 5000);
  return () => clearInterval(intervalId);
}, []);

// Efecto 2: reacción inmediata cuando token cambia
useEffect(() => {
  if (token) {
    const decoded = jwtDecode(token) as { id?: string; role?: string };
    setLoggedIn(!!decoded?.id);
    setIsAdmin(decoded?.role === "admin");
    setLoadingAuth(false);
  } else {
    setLoggedIn(false);
    setIsAdmin(false);
  }
}, [token]);

if (loadingAuth) {
  return <div className="text-[#ffffff]">Cargando...</div>;
}
if (!loggedIn) {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

return (
  <>
    <Routes>
      <Route element={<CheckToken />}>
        <Route element={<Layout />}>
          <Route path="/" element={<MainScreen />} />
          {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  </>
);

}