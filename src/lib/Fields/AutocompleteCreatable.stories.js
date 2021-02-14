import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import AutocompleteCreatable from './AutocompleteCreatable'

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

storiesOf('AutocompleteCreatable', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('AutocompleteCreatable Field')(story)(context)}</Root>
  ))
  .add('default', () => (
    <Field
      fullWidth
      id="municipio"
      component={AutocompleteCreatable}
      name="cidade"
      label="Fruta"
      loadOptions={load}
    />
  ))
  .add('Multiple', () => (
    <Field
      isMulti
      fullWidth
      id="municipio"
      component={AutocompleteCreatable}
      name="cidade"
      label="Fruta"
      loadOptions={load}
    />
  ))
