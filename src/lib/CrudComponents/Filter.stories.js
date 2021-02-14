import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter } from 'react-router-dom'
import { withInfo } from '@storybook/addon-info'
import Filter from './Filter'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'
import Select from '../Fields/Select'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const FullWidthGrid = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  )
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

const gridSelect = () => (
  <Grid spacing={3} container>
    <Grid item xs>
      <Field
        component={Select}
        hideEmpty
        options={[
          { label: 'Todos', value: '1' },
          { label: 'Ativos', value: '2' },
          { label: 'Inativos', value: '3' },
        ]}
        label="Situação"
        name="ativo"
        onChange={action('onChange')}
      />
    </Grid>
  </Grid>
)

const Root = ({ children }) => (
  <div style={{ height: '600px', marginTop: '3em' }}>
    <BrowserRouter>{children}</BrowserRouter>
  </div>
)

storiesOf('Filter', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('Filter Descrição')(story)(context)}</Root>
  ))
  .add('default', () => <Filter />)
  .add('default with labels', () => (
    <Filter labels={{ find: 'Buscar', clear: 'Limpar' }} />
  ))
  .add('full grid', () => <Filter> {FullWidthGrid()} </Filter>)
  .add('grid with textfield ', () => <Filter> {gridTextfield()} </Filter>)
  .add('grid with select ', () => <Filter> {gridSelect()} </Filter>)
  .add('grid with text field and labels', () => (
    <Filter labels={{ find: 'Buscar', clear: 'Limpar' }}>
      {gridTextfield()}
    </Filter>
  ))
