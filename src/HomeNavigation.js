import React, { useContext, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { AppWrap, RouteByMenu } from "./lib/AppWrap";
import { AuthContext } from "./lib/Login";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "@material-ui/icons/Settings";
import Tasks from "@material-ui/icons/List";
import { Switch, Redirect, Route } from "react-router-dom";
import * as R from "ramda";
import api from "./services/api";
import { useAbility } from "./modules/usuarios";
import logo from "./images/logo-full-white.png";


const TEMPO_PING_5_MIN = 1000 * 60 * 5;
const TEMPO_INATIVIDADE_20_MIN = 1000 * 60 * 20;

const useStyles = makeStyles(() => ({
  logo: {
    maxWidth: "100%",
  },
}));

const allMenuItems = [
  {
    label: "Tarefas",
    group: true,
    icon: Tasks,
    pathname: "/tarefas",
    items: [
    ],
  },
  {
    label: "Configurações",
    group: true,
    icon: Settings,
    pathname: "/configurations",
    items: [
    ],
  },
];

export const Home = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const usuario = authContext.user;

  const idleTimer = useRef(null);

  const onIdle = async () => {
    await api.logout();
    delete localStorage.user;
    window.location.replace("/");
  };

  const onAction = () => {
    api.ping(usuario.id);
  };

  let menuItems = [];
  const abilities = useAbility();
  if (abilities) {
    menuItems = allMenuItems.filter(({ name }) => {
      if (usuario.role !== "ADMIN" && name === "usuarios") return false;
      return abilities.can("read", name);
    });
  }

  const defaultRedirect = R.pathOr("/", [0, "pathname"], menuItems);

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onIdle={onIdle}
        onAction={onAction}
        throttle={TEMPO_PING_5_MIN}
        timeout={TEMPO_INATIVIDADE_20_MIN}
      />
      <AppWrap
        logo={<img alt="logo tp" src={logo} className={classes.logo} />}
        userAvatarProps={{
          action: "Sair",
          label: "Olá,",
        }}
        menuItems={menuItems}
      >
        <Switch>
          <RouteByMenu menuItems={menuItems} />
          <Redirect to={defaultRedirect} />
        </Switch>
      </AppWrap>
    </>
  );
};
