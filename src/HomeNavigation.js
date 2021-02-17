import React, { useContext, useRef } from 'react'
import IdleTimer from 'react-idle-timer'
import { AppWrap, RouteByMenu } from './lib/AppWrap'
import { AuthContext } from './lib/Login'
import { UsuariosList, UsuarioForm, useAbility } from './modules/usuarios'
import { Switch, Redirect } from 'react-router-dom'
import * as R from 'ramda'
import Person from '@material-ui/icons/Person'
import api from './services/api'

const TEMPO_PING_5_MIN = 1000 * 60 * 5
const TEMPO_INATIVIDADE_20_MIN = 1000 * 60 * 20

const allMenuItems = [
  {
    label: 'Usuarios',
    pathname: '/users',
    icon: Person,
    list: UsuariosList,
    form: UsuarioForm
  }
]

export const Home = () => {
  const authContext = useContext(AuthContext)
  const usuario = authContext.user

  const idleTimer = useRef(null)

  const onIdle = async () => {
    await api.logout()
    delete localStorage.user
    window.location.replace('/')
  }

  const onAction = () => {
    api.ping(usuario.id)
  }

  let menuItems = []
  const abilities = useAbility()
  if (abilities) {
    menuItems = allMenuItems.filter(({ name }) => {
      if (usuario.role !== 'ADMIN' && name === 'usuarios') return false
      return abilities.can('read', name)
    })
  }

  const defaultRedirect = R.pathOr('/', [0, 'pathname'], menuItems)

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
        userAvatarProps={{
          action: 'Sair',
          label: 'Olá,'
        }}
        menuItems={menuItems}
      >
        <Switch>
          <RouteByMenu menuItems={menuItems} />
          <Redirect to={defaultRedirect} />
        </Switch>
      </AppWrap>
    </>
  )
}
