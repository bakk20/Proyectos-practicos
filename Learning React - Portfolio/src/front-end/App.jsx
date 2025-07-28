import {
  LoginScreen,
  RegisterScreen,
  MainScreen,
  DevCodesSection,
  AboutScreen,
  Layout,
  UserAuth,
  BackgroundVideo,
  UserScreen
} from "./routes/index";

import { useState, useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
//import PageTransition from "./components/PageTransition";
//import { AnimatePresence } from "framer-motion";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem('user');
    return !!token;
  });

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setIsLoggedIn(res.ok))
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  return (
    <>
      <BackgroundVideo />

      {/*<AnimatePresence mode="wait">*/}
        <Routes location={location}>{/*key={location.pathname}*/}
          <Route
            path="/"
            element={
                <LoginScreen setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/register"
            element={
                <RegisterScreen />
            }
          />

          {/* Rutas protegidas bajo Layout */}
          <Route
            element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          >
            <Route element={<UserAuth isLoggedIn={isLoggedIn} />}>
              <Route path="/mainscreen" element={<MainScreen />} />
              <Route path="/aboutscreen" element={<AboutScreen />} />
              <Route path="/devcodessection" element={<DevCodesSection />} />
              <Route path="/userprofile" element={<UserScreen />} />
            </Route>
            <Route path="*" element={<Navigate to="/mainscreen" replace />} />
          </Route>
        </Routes>
      {/*</AnimatePresence>*/}
    </>
  );
};