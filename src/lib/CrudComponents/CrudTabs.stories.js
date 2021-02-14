import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'
import {CrudTabs, useTabsNavigation, CrudRoute} from './CrudTabs'
import CrudForm from './CrudForm'
import { GridTextField } from './CrudForm.stories';
import Filter from './Filter'
import List from './List'

const Root = ({children}) => (
  <div style={{padding: '3rem'}}>
    <MemoryRouter initialEntries={['/pessoas/10']}>
      {children}
    </MemoryRouter>
  </div>
)

const MyTabs = () => {
  const hook = useTabsNavigation({
    mainPath: 'pessoas',
    tabs: [
      {label: 'Pessoa', value: ''},
      {label: 'Contatos', value: 'contatos'},
    ]
  })
  return (
    <CrudTabs {...hook}>
      <CrudRoute render={() => <h1>Pessoas</h1>} />
      <CrudRoute name='contatos' render={() => <h1>Contatos</h1>} />
    </CrudTabs>
  )
}

const TabsWithCrudForm = () => {
  const hook = useTabsNavigation({
    mainPath: 'pessoas',
    tabs: [
      {label: 'Pessoa', value: ''},
      {label: 'Contatos', value: 'contatos'},
    ]
  })
  return (
    <CrudTabs {...hook}>
      <CrudRoute render={() => (
        <CrudForm
          onSubmit={action('onSubmit')}>
          <GridTextField />
        </CrudForm>
      )} />
      <CrudRoute name='contatos' render={() => <h1>Contatos</h1>} />
    </CrudTabs>
  )
}

const TabsWithFilterList = () => {
  const listOptions = {
    defaultOrder: 'telefone',
    fields: {
      nome: {
        label: 'Nome',
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

  const gridTextfield = () => (
    <Grid spacing={3} container>
      <Grid item xs>
        <Field
          fullWidth
          component={TextField}
          label="Título Interno"
          name="tituloInterno"
        />
      </Grid>
    </Grid>
  )

  const hook = useTabsNavigation({
    mainPath: 'pessoas',
    withPaper: false,
    tabs: [
      {label: 'Pessoa', value: ''},
      {label: 'Contatos', value: 'contatos'},
    ]
  })
  return (
    <CrudTabs {...hook}>
      <CrudRoute render={() => (
        <>
          <Filter labels={{ find: 'Buscar', clear: 'Limpar' }}>
            {gridTextfield()}
          </Filter>
          <List listOptions={listOptions} getPage={getPage}/>
        </>
      )} />
      <CrudRoute name='contatos' render={() => <h1>Contatos</h1>} />
    </CrudTabs>
  )
}

storiesOf('CrudTabs', module)
  .addDecorator((story, context) => <Root>{withInfo('CrudTabs')(story)(context)}</Root>)
  .add('default', () => (
    <MyTabs />
  ))
  .add('default with CrudForm', (props) => (
    <TabsWithCrudForm />
  ))
  .add('default with TabsWithFilterList', (props) => (
    <TabsWithFilterList />
  ))

