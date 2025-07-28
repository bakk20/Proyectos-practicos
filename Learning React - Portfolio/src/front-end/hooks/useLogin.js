import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helpers/loginUser';

export const useLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const { ok, data, error } = await loginUser(email, password);

    if (ok) {
      // ✅ Guardar token y usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);
      navigate('/mainscreen', { replace: true });

      return { success: true };
    } else {
      return { success: false, message: data?.message || error };
    }
  };

  return { login };
};