import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import TextField from './TextField'

const validate = values => {
  if (!values.nome) {
    return {
      nome: 'Nome obrigatório',
    }
  }
}

const Root = ({ children }) => (
  <Form onSubmit={() => {}} validate={validate}>
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Form>
)

storiesOf('TextField', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('Text Field')(story)(context)}</Root>
  ))
  .add('default', () => (
    <Field
      name="nome"
      label="Nome"
      inputProps={{ maxLength: 4 }}
      onChange={action('onChange')}
      component={TextField}
    />
  ))
