import React, { useRef } from "react";
import { withLogin } from "../../lib/Login";
import api from "../../services/api";
import * as R from "ramda";
import logo from "../../images/hermes-logo.png";
import { Grid } from "@material-ui/core";
import LoginForm from "./LoginForm";

const Login = withLogin(LoginForm);

export const handleLogin = ({ login, setToken = R.empty }) => async ({
  email,
  password,
}) => {

  if (!email || !password) {
    return;
  }
  const response = await login({
    email,
    password,
  });

  setToken(response.data.authentication.accessToken)

  if (response.ok) {
    return {
      ok: true,
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role,
      token: response.data.authentication.accessToken
    };
  } else {
    return {
      ok: false,
      message: "Usuário e/ou senha inválidos!",
    };
  }
};

const CustomLogin = ({ history }) => {
  const loginRef = useRef();;
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
