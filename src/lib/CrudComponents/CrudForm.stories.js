import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import {BrowserRouter} from 'react-router-dom'
import {TextField} from 'final-form-material-ui'
import CrudForm from './CrudForm'
import Grid from '@material-ui/core/Grid'
import {Field} from 'react-final-form'
import ClearAllIcon from '@material-ui/icons/ClearAll'
const Root = ({children}) => (
    <div style={{padding: '3rem'}}>
        <BrowserRouter>
        {children}
        </BrowserRouter>
    </div>
)

const onClickReset =  action('onClickReset')

export const GridTextField = () => (
    <Grid container spacing={2}>
        <Grid item sm={5}>
            <Field
                label='Nome'
                name='nome'
                fullWidth
                component={TextField}
            />
        </Grid>
        <Grid item sm={5}>
            <Field
                label='Email'
                name='email'
                fullWidth
                component={TextField}
            />
        </Grid>
    </Grid>
)


const renderForm = (data) =>  {
  return (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <Field
          label='Nome'
          name='nome'
          fullWidth
          component={TextField}
        />
      </Grid>
      <Grid item sm={5}>
        <Field
          label='Email'
          name='email'
          fullWidth
          component={TextField}
        />
      </Grid>
    </Grid>
  )
}

const getItem = {
  nome: 'Thiago',
  email: 'thiagoyasunaka@hotmail.com'
}

storiesOf('CrudForm', module)
  .addDecorator((story, context) => <Root>{withInfo('List Descrição')(story)(context)}</Root>)
  .add('default', () =>
    <CrudForm
      onSubmit={action('onSubmit')}>
      <GridTextField />
    </CrudForm>)
    .add('With function in children', () =>
      <CrudForm
        withPaper
        onSubmit={action('onSubmit')}>
        {renderForm}
      </CrudForm>)
    .add('With Paper', () =>
      <CrudForm
        withPaper
        onSubmit={action('onSubmit')}>
        <GridTextField />
      </CrudForm>)
    .add('Custom Action', () =>
      <CrudForm
        customActions={[
          {
            label: 'Resetar',
            onClick:onClickReset,
            icon: <ClearAllIcon />
          }
        ]}
        withPaper
        onSubmit={action('onSubmit')}>
        <GridTextField />
      </CrudForm>)
    .add('Use validate', () =>
      <CrudForm
        validate={
          (values) => ({
            nome: values.nome ? undefined : 'Obrigatório',
            email: values.email ? undefined : 'Obrigatório'
          })
        }
        withPaper
        onSubmit={action('onSubmit')}>
        <GridTextField />
      </CrudForm>)
