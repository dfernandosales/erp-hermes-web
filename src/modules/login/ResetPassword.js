import React from "react";
import { RecoverPassword } from "../../lib/Login";
import api from "../../services/api";
import logo from "../../images/g10-logo.png";
import { Grid } from "@material-ui/core";

export const handleSubmit = (init, location) => async ({ username }) => {
  const params = new URLSearchParams(location.search);
  const response = await init({
    action: params.get("action"),
    password: username,
    token: params.get("token"),
  });
  if (response.ok) {
    return Promise.resolve({
      ok: true,
      message: "Senha redefinida com sucesso!",
    });
  }
  return { ok: false, message: "Token inválido" };
};

export default function CustomRecoverPassword({ history, location }) {
  return (
    <RecoverPassword
      logo={
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <img alt="logo" src={logo} style={{ marginBottom: 20 }} />
          </Grid>
        </Grid>
      }
      history={history}
      fieldType="password"
      usernameLabel="Nova senha"
      backLabel="Ir para Login"
      submitLabel="Redefinir senha"
      requiredLabel="Obrigatório"
      onBackClick={() => history.push("/login")}
      onSubmit={handleSubmit(api.resetPassword, location)}
    />
  );
}
