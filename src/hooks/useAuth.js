import { useState, useEffect } from "react";

export function useAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(null);
  }, []);

  return token;
}
