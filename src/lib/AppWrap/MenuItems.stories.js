import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import Face from '@material-ui/icons/Face'
import { withInfo } from '@storybook/addon-info'
import MenuItems from './MenuItems'
import { makeStyles } from '@material-ui/core/styles'
import { action } from '@storybook/addon-actions'

const styles = makeStyles({
  menuColor: {
    color: '#263238'
  },
  menuColorActive: {
    color: '#ffab00'
  },
  active: {
    borderLeft: `solid 3px #ffab00`,
    borderImageSlice: 1
  }
})

const menuItems = [
  {
    label: 'Pessoas',
    pathname: '/pessoas',
    icon: Face
  },
  {
    label: 'Academias',
    pathname: '/academias',
    icon: FitnessCenter
  }
]

const Root = ({ children }) => (
  <div style={{ height: '600px', marginTop: 30 }}>
    <BrowserRouter>{children}</BrowserRouter>
  </div>
)

storiesOf('MenuItems', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('Itens que serão renderizados como botões no Menu')(story)(context)}</Root>
  ))
  .add('default', () => <MenuItems items={menuItems} onMenuIconClick={action('onMenuIconClick')}/>)
  .add('light Theme', () => <MenuItems items={menuItems} onMenuIconClick={action('onMenuIconClick')} theme='light' />)
  .add('Custom Colors', () => <MenuItems items={menuItems} onMenuIconClick={action('onMenuIconClick')} classes={styles()} />)
