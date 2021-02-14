import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import Face from '@material-ui/icons/Face'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import { action } from '@storybook/addon-actions'
import { makeStyles } from '@material-ui/core/styles'
import { withInfo } from '@storybook/addon-info'
import AssessmentIcon from '@material-ui/icons/Assessment'
import logoSicoob from '../images/logo-sicoob.png'
import { location, createState, listOptions } from '../Components/List.stories'
import List from '../Components/List'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

import AppWrap from './AppWrap'
import Grid from '@material-ui/core/Grid'
import { Button, Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

const style = makeStyles({
  drawerMenu: {
    background: '#b0bec5',
  },
  drawerHeader: {
    backgroundColor: '#ffab00',
  },
  content: {
    backgroundColor: '#ffecb3',
  },
})

const styleDefault = makeStyles({ 
  notificationIcon: {
    fontSize: 40
  }
})

const style2 = makeStyles({
  drawerHeader: {
    backgroundColor: '#ffab00',
  },
})

const menuItemsStyle = makeStyles({
  menuColor: {
    color: '#37474f',
  },
  menuColorActive: {
    color: '#ffc107',
  },
  active: {
    borderLeft: 'solid 3px #ffc107',
    borderImageSlice: 1,
  },
})

const buttonMenuColorStyle = makeStyles({
  menuButton: {
    color: 'white',
  },
})

const Root = ({ children }) => (
  <div style={{ height: '600px', marginTop: 30 }}>
    <BrowserRouter>{children}</BrowserRouter>
  </div>
)

const Logo = () => (
  <img
    src={logoSicoob}
    alt="Logo Sicoob"
    style={{
      height: 50,
    }}
  />
)

const menuItems = [
  {
    label: 'Pessoas',
    pathname: '/pessoas',
    icon: Face,
  },
  {
    label: 'Gráficos',
    pathname: '/graficos',
    icon: AssessmentIcon,
  },
  {
    group: true,
    label: 'Academias',
    pathname: '/academias',
    icon: FitnessCenter,
    items: [
      {
        pathname: `/grupos-alimentares`,
        label: 'Grupos Alimentares',
      },
      {
        pathname: `/receitas`,
        label: 'Receitas',
      },
      {
        pathname: `/tipos-de-refeicoes`,
        label: 'Tipos de Refeições',
      },
      {
        pathname: `/cardapios`,
        label: 'Cardápios',
      },
    ],
  },
  {
    group: true,
    label: 'Alphabjket',
    pathname: '/academias',
    icon: DesktopWindowsIcon,
    items: [
      {
        pathname: `/A`,
        label: 'A',
      },
      {
        pathname: `/B`,
        label: 'B',
      },
      {
        pathname: `/C`,
        label: 'C',
      },
      {
        pathname: `/D`,
        label: 'D',
      },
    ],
  },
  {
    label: 'Relatórios',
    group: true,
    pathname: '/relatorios',
    icon: FitnessCenter,
    items: [
      {
        label: 'Financeiro',
        pathname: '/relatorio-financeiro',
        icon: FitnessCenter,
      },
      {
        label: 'Pessoas',
        pathname: '/relatorio-pessoas',
        icon: FitnessCenter,
      },
    ],
  },
]

const actions = {
  onLogout: action('onLogout'),
  onToggleDrawer: action('onToggleDrawer'),
}

const CustomBar = props => (
  <Grid container style={{ justifyContent: 'flex-end' }}>
    <Grid item sm={2}>
      <Select fullWidth>
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
      </Select>
    </Grid>
    <Button title="Botão" variant="text">
      Botão
    </Button>
  </Grid>
)

storiesOf('AppWrap', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('Filter Descrição')(story)(context)}</Root>
  ))
  .add('default', () => {
    const style = styleDefault();
    return (
      <AppWrap style={{ height: '100%' }} menuItems={menuItems} {...actions} userAvatarProps={{
        action: 'Sair',
        label: 'Olá,'
      }}>
        <h1>Content</h1>
      </AppWrap>
    )
  })
  .add('default with children', () => {
    const style = styleDefault();
    return (
      <AppWrap style={{ height: '100%' }} menuItems={menuItems} {...actions} userAvatarProps={{
        action: 'Sair',
        label: 'Olá,',
        children: 
          <Grid item>
            <NotificationsNoneOutlinedIcon fontSize='large' className={style.notificationIcon}/>
          </Grid>
      }}>
        <h1>Content</h1>
      </AppWrap>
    )
  })
  .add('default with list', () => (
    <AppWrap style={{ height: '100%' }} menuItems={menuItems} {...actions}>
      <List
        stickyHeader
        adjustToScreenHeight
        location={location}
        listOptions={listOptions}
        state={createState(30)}
      />
    </AppWrap>
  ))
  .add('light theme', () => (
    <AppWrap menuItems={menuItems} {...actions} theme="light">
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('light theme custom header', () => (
    <AppWrap
      menuItems={menuItems}
      {...actions}
      theme="light"
      classes={style2()}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('custom colors', () => (
    <AppWrap menuItems={menuItems} {...actions} classes={style()}>
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('custom colors', () => (
    <AppWrap
      menuItems={menuItems}
      {...actions}
      classes={style()}
      menuItemsClasses={menuItemsStyle()}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('light theme without Bradcrumb', () => (
    <AppWrap menuItems={menuItems} {...actions} theme="light" hideBreadcrumb>
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('default userAvatar pt-bt', () => (
    <AppWrap
      {...actions}
      menuItems={menuItems}
      userAvatarProps={{ label: 'Olá,', action: 'Sair' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('default with breadcrumb mapping', () => (
    <AppWrap
      {...actions}
      menuItems={menuItems}
      pathReadableMap={{ 'iframe.html': 'Página Principal' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('Testing menu', () => (
    <AppWrap
      {...actions}
      menuItems={menuItems}
      userAvatarProps={{ label: 'Olá,', action: 'Sair' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('Position button menu in drawer', () => (
    <AppWrap
      {...actions}
      menuItems={menuItems}
      isPositionButtonMenuDrawer={true}
      userAvatarProps={{ label: 'Olá,', action: 'Sair' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('Position button menu in drawer with logo', () => (
    <AppWrap
      {...actions}
      classes={buttonMenuColorStyle()}
      logo={<Logo />}
      menuItems={menuItems}
      isPositionButtonMenuDrawer={true}
      userAvatarProps={{ label: 'Olá,', action: 'Sair' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('Hide Menu Button', () => (
    <AppWrap
      {...actions}
      classes={buttonMenuColorStyle()}
      menuItems={menuItems}
      hideMenuButton
      userAvatarProps={{ label: 'Olá,', action: 'Sair' }}
    >
      <h1>Content</h1>
    </AppWrap>
  ))
  .add('custom bar', () => (
    <AppWrap menuItems={menuItems} {...actions} customBar={<CustomBar />}>
      <h1>Content</h1>
    </AppWrap>
  ))
