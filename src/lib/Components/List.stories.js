import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import List from './List'
import { withInfo } from '@storybook/addon-info'
import { MemoryRouter as Router } from 'react-router-dom'
import { action } from '@storybook/addon-actions'

export const listOptions = {
  defaultOrder: 'telefone',
  fields: {
    nome: {
      label: 'Nome super completo',
      align: 'center',
    },
    sobrenome: {
      label: 'Sobrenome super completo',
      align: 'center',
    },
    idade: {
      label: 'Idade',
      align: 'right',
    },
  },
}

const state = {
  count: 10,
  list: [{ nome: 'Marina', sobrenome: 'Silva', idade: 10 }],
  loading: false,
  needRender: false
}

const stateEmpty = {
  count: 0,
  list: [],
  loading: false,
  needRender: false
}

const state2 = {
  count: 2,
  list: [
    {
      nome: 'Marina',
      idade: 10,
      endereco: { logradouro: 'Rua dos bobos', numero: 0 },
      ativo: true,
    },
    {
      nome: 'João',
      idade: 20,
      endereco: { logradouro: 'Rua dos bobos - Fundo', numero: 1 },
      ativo: true,
    },
    {
      nome: 'Maria',
      idade: 21,
      endereco: { logradouro: 'Rua de cima', numero: 2 },
      ativo: true,
    },
    {
      nome: 'Gabriel',
      idade: 22,
      endereco: { logradouro: 'Rua de baixo', numero: 3 },
      ativo: true,
    },
  ],
  loading: false,
  needRender: false
}

export const createState = nrows => {
  const list = [...Array(nrows).keys()].map(i => ({
    nome: `Marina ${i}`,
    idade: 10,
  }))

  return {
    list,
    count: list.length,
    loading: false,
  }
}

export const location = { search: '' }

const Root = ({ children }) => (
  <div style={{ padding: '3rem' }}>
    <Router>{children}</Router>
  </div>
)

storiesOf('New List', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('List Descrição')(story)(context)}</Root>
  ))
  .add('default', () => (
    <List location={location} listOptions={listOptions} state={state} />
  ))
  .add('empty values', () => (
    <List location={location} listOptions={listOptions} state={stateEmpty} />
  ))
  .add('empty values loading', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={{ ...stateEmpty, loading: true }}
    />
  ))
  .add('empty values custom text', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={stateEmpty}
      emptyText="Nenhum Resultado Encontrado!"
    />
  ))
  .add('default with actions buttons', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={state}
      onClickEdit
      onClickNew
      onClickView
      removeItem
    />
  ))
  .add('default without actions buttons', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={state}
      hideDownloadIcon
      onClickEdit={null}
      onClickNew={null}
      onClickView={null}
      removeItem={null}
    />
  ))
  .add('loading', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={{ ...state, loading: true }}
    />
  ))
  .add('pagination', () => (
    <List
      location={location}
      listOptions={listOptions}
      state={createState(11)}
      removeItem
      removeItem={action('onClickDelete')}
    />
  ))
  .add('stickyHeader', () => (
    <List
      stickyHeader
      adjustToScreenHeight
      location={location}
      listOptions={listOptions}
      state={createState(30)}
    />
  ))
  .add('stickyHeader loading', () => (
    <List
      stickyHeader
      adjustToScreenHeight
      location={location}
      listOptions={listOptions}
      state={{ ...state, loading: true }}
    />
  ))
  .add('adjustToScreenHeight', () => (
    <List
      adjustToScreenHeight
      location={location}
      listOptions={listOptions}
      state={createState(30)}
    />
  ))
  .add('custon Download Function', () => (
    <List
      adjustToScreenHeight
      location={location}
      listOptions={listOptions}
      state={state2}
      onDownloadClick={() => alert('Custom Download')}
    />
  ))
