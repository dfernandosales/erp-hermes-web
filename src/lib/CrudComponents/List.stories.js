import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import List from './List'
import { withInfo } from '@storybook/addon-info'
import { BrowserRouter } from 'react-router-dom'

const listOptions = {
  defaultOrder: 'telefone',
  fields: {
    nome: {
      label: 'Nome',
    },
    sobrenome: {
      label: 'sobrenome'
    },
    idade: {
      label: 'idade'
    },
    sexo: {
      label: 'sexo'
    },
    telefone: {
      label: 'Telefone',
    },
  },
}

const getPage = async () => {
  const list = [...Array(15).keys()].map(id => {
    return {
      nome: `Pessoa ${id}`,
      telefone: '(44)1111 1111',
    }
  })
  return list
}

const getCount = async () => {
  const list = await getPage()
  return list.length
}

const location = { search: '' }

const Root = ({ children }) => (
  <div style={{ padding: '3rem' }}>
    <BrowserRouter>{children}</BrowserRouter>
  </div>
)

storiesOf('List', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('List Descrição')(story)(context)}</Root>
  ))
  .add('default', () => (
    <List location={location} listOptions={listOptions} getPage={getPage}/>
  ))
  .add('paper', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      withPaper
    />
  ))
  .add('deleteFItem', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      deleteFItem={action('onClickFDelete')}
    />
  ))
  .add('deleteItem', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      deleteItem={action('onClickDelete')}
    />
  ))
  .add('action buttons', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      onClickNew={action('onClickNew')}
      onClickEdit={action('onClickEdit')}
      onClickView={action('onClickView')}
      deleteItem={action('onClickDelete')}
      hideDownloadIcon={false}
    />
  ))
  .add('Hide Download Icon', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      onClickNew={action('onClickNew')}
      onClickEdit={action('onClickEdit')}
      onClickView={action('onClickView')}
      deleteItem={action('onClickDelete')}
      hideDownloadIcon={true}
    />
  ))
  .add('pagination', () => (
    <List
      location={location}
      listOptions={listOptions}
      getPage={getPage}
      getCount={getCount}
      onClickNew={action('onClickNew')}
      onClickEdit={action('onClickEdit')}
      onClickView={action('onClickView')}
      deleteItem={action('onClickDelete')}
    />
  ))
