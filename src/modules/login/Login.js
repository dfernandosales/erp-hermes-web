import React, { useEffect, useRef } from "react";
import { withLogin } from "../../lib/Login";
import api from "../../services/api";
import logo from "../../images/hermes-logo.png";
import { Grid } from "@material-ui/core";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";

const Login = withLogin(LoginForm);

export const handleLogin = ({ login }) => async ({
  email,
  password,
}) => {
  if (!email) {
    return;
  }
  const response = await login({
    email,
    password,
  });

  if (response.ok) {
    return {
      ok: true,
      id: response.data.usuario.id,
      email: response.data.usuario.email,
      name: response.data.usuario.name,
      role: response.data.usuario.role,
    };
  } else {
    return {
      ok: false,
      message: "Usuário e/ou senha inválidos!",
    };
  }
};

const CustomLogin = ({ history }) => {
  const location = useLocation();
  const loginRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const password = params.get("password");
    const email = params.get("state");
    if (password && email) {
      loginRef.current.handleSubmit({ email, password });
    }
  }, [location.search]);

  return (
    <Login
      logo={
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <img alt="logo" src={logo} style={{ marginBottom: 20 }} />
          </Grid>
        </Grid>
      }
      history={history}
      ref={loginRef}
      onSubmit={handleLogin(api)}
      requiredLabel="Obrigatório"
      submitLabel="Entrar"
    />
  );
};

export default CustomLogin;
