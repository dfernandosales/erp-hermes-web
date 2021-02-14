import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import Autocomplete from './Autocomplete'
import TextField from './TextField'
import Grid from '@material-ui/core/Grid'

const Root = ({ children }) => (
  <Form initialValues={{ radio: 'taylor' }} onSubmit={() => {}}>
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Form>
)

const load = () => {
  const values = [
    { label: 'Abacate', value: '1' },
    { label: 'Abacaxi', value: '2' },
    { label: 'Maçã', value: '3' },
    { label: 'Tomate', value: '4' },
    { label: 'Morango', value: '5' },
    { label: 'Banana', value: '6' },
    { label: 'Taylor Swift', value: '7' },
    {
      label: 'Uma opção bem grandona mesmo muito grande gigantesca',
      value: '8',
    },
  ]
  return Promise.resolve(values)
}

storiesOf('Autocomplete', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('Autocomplete Field')(story)(context)}</Root>
  ))
  .add('default', () => (
    <Field
      fullWidth
      id="municipio"
      component={Autocomplete}
      name="cidade"
      label="Fruta"
      loadOptions={load}
    />
  ))
  .add('with textfield', () => (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Field
          fullWidth
          component={TextField}
          label="Número"
          name="numero"
          type="number"
          parse={number => (number < 0 ? 0 : number)}
        />
      </Grid>
      <Grid item xs={3}>
        <Field
          fullWidth
          component={Autocomplete}
          loadOptions={load}
          label="Regra"
          name="regra_fila"
        />
      </Grid>
    </Grid>
  ))
  .add('Disabeld', () => (
    <Field
      fullWidth
      id="municipio"
      component={Autocomplete}
      name="cidade"
      label="Fruta"
      loadOptions={load}
      disabled
    />
  ))
  .add('Multiple', () => (
    <Field
      isMulti
      fullWidth
      id="municipio"
      component={Autocomplete}
      name="cidade"
      label="Fruta"
      loadOptions={load}
    />
  ))
