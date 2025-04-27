import { useState, useEffect } from "react";

export function useAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Aquí analizarías la URL, ver si hay "?code=XYZ", 
    // e intercambiarlo por un access_token en tu backend
    // Por ahora, es un placeholder:
    setToken(null);
  }, []);

  return token; // Retornas el access_token o null
}
