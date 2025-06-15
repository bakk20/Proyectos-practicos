import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { UserAuth } from "./Components/UserAuth";
import { Layout } from "./Components/Layout";
import { LoginScreen } from "./Components/LoginScreen";
import { MainScreen } from "./Components/MainScreen";
import { DevCodesSection } from "./Components/DevCodesSection";
import { AboutScreen } from "./Components/AboutScreen";
import { BackgroundVideo } from "./Components/BackgroundVideo";
import UserScreen from "./Components/UserScreen";

export const App = () => {
  // Leer token al inicio (permite persistir login)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const location = useLocation();
  const hideNavBar = location.pathname === "/";

  useEffect(() => {
    // FUTURO: Validar token en backend para evitar token inválido o expirado, una Mousekerramienta pa despue
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetch("http://localhost:5000/api/validate", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //     .then((res) => res.ok ? setIsLoggedIn(true) : setIsLoggedIn(false))
    //     .catch(() => setIsLoggedIn(false));
    // }
  }, []);

  return (
    <>
      <BackgroundVideo />

      {hideNavBar ? (
        // Login route sin layout
        <Routes>
          <Route path="/" element={<LoginScreen setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        // Rutas privadas dentro del layout
        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            <Route element={<UserAuth isLoggedIn={isLoggedIn} />}>
              <Route path="/mainscreen" element={<MainScreen />} />
              <Route path="/aboutscreen" element={<AboutScreen />} />
              <Route path="/devcodessection" element={<DevCodesSection />} />
              <Route path="/userprofile" element={<UserScreen />} />
            </Route>
            <Route path="*" element={<Navigate to="/mainscreen" replace />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};