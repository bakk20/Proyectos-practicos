export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.message || "Credenciales incorrectas" };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "No se pudo conectar con el servidor" };
  }
};
