import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt-br";
import api from "./services/api";
import { Home } from "./HomeNavigation";
import {Auth as AuthProvider, loginRoutes, PrivateRoute} from  "./lib/Login"
import {
  Login,
  ResetPassword,
  RecoverPassword,
  VerifyLogin,
} from "./modules/login";
import MomentUtils from "@date-io/moment";
import { AbilityContext, abilityFor } from "./modules/usuarios";
import usuariosRepository from "./modules/usuarios/usuariosRepository";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

const styles = () => ({
  "@global": {
    "*::-webkit-scrollbar": {
      height: "0.6em",
      width: "0.6em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

function App() {
  moment.locale("pt-br");


  const [ability, setAbility] = useState();

  const updateUsuario = async id => {
    const response = await usuariosRepository.getOne({ id });
    if (response.ok) {
      setAbility(abilityFor(response.data));
    }
  };

  const withUsuario = async usuario => {
    await api.setToken(usuario.token);
    updateUsuario(usuario.id);
  };

  return (
    <ThemeProvider theme={theme}>
      <AbilityContext.Provider value={ability}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider
            withUser={withUsuario}
            onLogout={() => {
              api.logout();
              setAbility(null);
            }}
          >
            <VerifyLogin />
            <Router>
              <Switch>
                <Route path={loginRoutes.login} component={Login} />
                <Route
                  path={loginRoutes.recoverPassword}
                  component={RecoverPassword}
                />
                <Route path="/init" component={ResetPassword} />
                <PrivateRoute path="/" render={() => <Home />} />
              </Switch>
            </Router>
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </AbilityContext.Provider>
    </ThemeProvider>
  );
}

export default App;
