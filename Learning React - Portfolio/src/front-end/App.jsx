import {
  LoginScreen,
  RegisterScreen,
  MainScreen,
  ProjectsScreen,
  AboutScreen,
  RicksitoScreen,
  Layout,
  BackgroundVideo,
} from "./routes/index";

import { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

export const App = () => {
  // El login/registro se mantiene funcional pero aislado (rutas /login y /register).
  // Ya no bloquea el acceso al portafolio: todo lo demás es público.
  const [, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const location = useLocation();

  return (
    <>
      <BackgroundVideo />

      <Routes location={location}>
        {/* Portafolio público, acceso directo */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/proyectos" element={<ProjectsScreen />} />
          <Route path="/ricksito" element={<RicksitoScreen />} />
        </Route>

        {/* Login/registro: aislados, no requeridos para ver el portafolio */}
        <Route path="/login" element={<LoginScreen setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};