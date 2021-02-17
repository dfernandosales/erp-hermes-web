import React from "react";
import { RecoverPassword } from "../../lib/Login";
import api from "../../services/api";
import logo from "../../images/hermes-logo.png";
import { Grid } from "@material-ui/core";

export const handleSubmit = recoverPassword => async ({ username }) => {
  const response = await recoverPassword({
    action: "resetSend",
    email: username,
  });
  if (response.ok) {
    return Promise.resolve({
      ok: true,
      message: "E-mail enviado, verifique sua caixa de entrada",
    });
  }
  return { ok: false, message: "E-mail inválido" };
};

export default function CustomRecoverPassword({ history }) {
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
      usernameLabel="E-mail"
      backLabel="Voltar"
      submitLabel="Recuperar"
      requiredLabel="Obrigatório"
      onBackClick={() => history.goBack()}
      onSubmit={handleSubmit(api.resetPassword)}
    />

  );
}
