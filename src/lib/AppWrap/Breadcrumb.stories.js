import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import Breadcrumb from './Breadcrumb'

const Root = ({ children }) => (
  <div style={{ height: '600px', marginTop: 30 }}>
    <BrowserRouter>{children}</BrowserRouter>
  </div>
)

storiesOf('Breadcrumb', module)
  .addDecorator((story, context) => <Root>{withInfo('Filter Descrição')(story)(context)}</Root>)
  .add('default', () => (
    <Breadcrumb history={{ location: { pathname: '/pagina-principal' }, push: action('breadcrumb-click') }}>
      <h1>Content</h1>
    </Breadcrumb>
  ))
  .add('With identifier', () => (
    <Breadcrumb history={{ location: { pathname: '/products/9' }, push: action('breadcrumb-click') }}>
      <h1>Content</h1>
    </Breadcrumb>
  ))
  .add('With identifier action', () => (
    <Breadcrumb history={{ location: { pathname: '/products/9/history' }, push: action('breadcrumb-click') }}>
      <h1>Content</h1>
    </Breadcrumb>
  ))
  .add('With identifier and label', () => (
    <Breadcrumb history={{ location: { pathname: '/products/9/history' }, push: action('breadcrumb-click') }} info={{ label: 'Label' }}>
      <h1>Content</h1>
    </Breadcrumb>
  ))
  .add('With identifier label and path mapping', () => (
    <Breadcrumb pathReadableMap={{ products: 'Produtos', history: 'Historico' }} history={{ location: { pathname: '/products/9/history' }, push: action('breadcrumb-click') }} info={{ label: 'Label' }}>
      <h1>Content</h1>
    </Breadcrumb>
  ))
