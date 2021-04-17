import React, { useContext, useRef } from 'react'
import IdleTimer from 'react-idle-timer'
import { AppWrap, RouteByMenu } from './lib/AppWrap'
import { AuthContext } from './lib/Login'
import { UsuariosList, UsuarioForm, useAbility } from './modules/usuarios'
import { Switch, Redirect, Route } from 'react-router-dom'
import * as R from 'ramda'
import Person from '@material-ui/icons/Person'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import api from './services/api'
import CategoriaQuartoList from './modules/categoria-quarto/CategoriaQuartoList'
import QuartoList from './modules/quarto/QuartoList'
import QuartoForm from './modules/quarto/QuartoForm'
import FuncionarioList from './modules/funcionario/FuncionarioList'
import FuncionarioForm from './modules/funcionario/FuncionarioForm'
import FolhaRecebimentoList from './modules/folha-recebimento/FolhaRecebimentoList'
import FolhaRecebimentoForm from './modules/folha-recebimento/FolhaRecebimentoForm'
import HospedeList from './modules/hospede/HospedeList'
import HospedeForm from './modules/hospede/HospedeForm'
import ItemQuartoList from './modules/item-quarto/ItemQuartoList'
import ItemQuartoForm from './modules/item-quarto/ItemQuartoForm'
import HotelIcon from '@material-ui/icons/Hotel';
import CategoriaQuartoTabsForm from './modules/categoria-quarto/CategoriaQuartoTabsForm'
import CategoriaItemQuartoForm from './modules/categoria-item-quarto/CategoriaItemQuartoForm'
import ReservaList from './modules/reserva/ReservaList'
import ReservaFormTabs from './modules/reserva/ReservaFormTabs'
import OcupacaoChart from './modules/ocupacao/OcupacaoChart'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ReservaView from './modules/reserva/ReservaView'
import AssessmentIcon from '@material-ui/icons/Assessment';
import ApartmentIcon from '@material-ui/icons/Apartment';

const TEMPO_PING_5_MIN = 1000 * 60 * 5
const TEMPO_INATIVIDADE_20_MIN = 1000 * 60 * 20

const allMenuItems = [
  {
    label: 'Reserva',
    name: 'reserva',
    icon: AssignmentTurnedInIcon,
    pathname: '/reserva',
    list: ReservaList,
    form: ReservaFormTabs
  },
  {
    name: "quartos",
    label: "Quartos",
    group: true,
    icon: HotelIcon,
    pathname: "/quarto",
    items: [

      {
        label: 'Quarto',
        name: 'quarto',
        pathname: '/quarto',
        list: QuartoList,
        form: QuartoForm
      },
      {
        label: 'Categoria Quarto',
        name: 'categoria-quarto',
        pathname: '/categoria-quarto',
        list: CategoriaQuartoList,
        form: CategoriaQuartoTabsForm
      },
      {
        label: 'Item Quarto',
        name: 'item-quarto',
        pathname: '/item-quarto',
        list: ItemQuartoList,
        form: ItemQuartoForm,
      }
    ]
  },
  {
    label: 'Usuarios',
    name: 'usuarios',
    pathname: '/users',
    icon: Person,
    list: UsuariosList,
    form: UsuarioForm
  },
  {
    label: 'Funcionario',
    name: 'funcionario',
    pathname: '/funcionario',
    icon: AssignmentIndIcon,
    list: FuncionarioList,
    form: FuncionarioForm,
  },
  {
    label: 'Hospede',
    name: 'hospede',
    pathname: '/hospede',
    icon: PeopleAltIcon,
    list: HospedeList,
    form: HospedeForm,
  },
  {
    label: 'Ocupacao',
    name: 'ocupacao',
    pathname: '/ocupacao',
    icon: ApartmentIcon,
    list: OcupacaoChart
  },
  {
    name: "relatorios",
    label: "Relatorios",
    group: true,
    icon: AssessmentIcon,
    pathname: "/relatorios",
    items: [
      {
        label: 'Folha de Recebimento',
        name: 'folhaRecebimento',
        pathname: '/folhaRecebimento',
        list: FolhaRecebimentoList,
        form: FolhaRecebimentoForm,
      }
    ]
  },
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
        pathReadableMap={{
          categoriaItemQuarto: "Item da Categoria",
        }}
      >
        <Switch>
          <Route exact path="/categoria-item-quarto" component={CategoriaItemQuartoForm} />
          <Route exact path="/reserva/:id/view" component={ReservaView} />
          <RouteByMenu menuItems={menuItems} />
          <Redirect to={defaultRedirect} />
        </Switch>
      </AppWrap>
    </>
  )
}
