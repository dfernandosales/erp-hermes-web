import { useContext, useEffect, useCallback } from "react";
import {AuthContext  } from "../../lib/Login";
import api from "../../services/api";

const VerifyLogin = () => {
  const context = useContext(AuthContext);

  const verifyToken = useCallback(async () => {
    const { user: usuario } = context;
    if (usuario) {
      const response = await api.ping(usuario.id);
      if (response.status === 401) {
        context.loggedin && context.logout();
      }
    }
  }, [context]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);
  return null;
};

export default VerifyLogin;
