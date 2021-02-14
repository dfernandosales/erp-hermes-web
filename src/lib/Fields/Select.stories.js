import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import Select from './Select'

const validate = values => {
  if (!values.ativo) {
    return {
      ativo: 'Necessita selecionar uma opção'
    }
  }
}

const Root = ({ children }) => (
  <Form onSubmit={() => {}} validate={validate}>
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Form>
)

storiesOf('Select', module)
  .addDecorator((story, context) => <Root>{withInfo('Select Field')(story)(context)}</Root>)
  .add('default', () => (
    <Field
      component={Select}
      hideEmpty
      options={[
        { label: 'Todos', value: '1' },
        { label: 'Ativos', value: '2' },
        { label: 'Inativos', value: '3' }
      ]}
      label='Situação'
      name='ativo'
      onChange={action('onChange')}
    />
  ))
  .add('without hideEmpty', () => (
    <Field
      component={Select}
      options={[
        { label: 'Todos', value: '1' },
        { label: 'Ativos', value: '2' },
        { label: 'Inativos', value: '3' }
      ]}
      label='Situação'
      name='ativo'
      onChange={action('onChange')}
    />
  ))
  .add('with custom width', () => (
    <Field
      component={Select}
      hideEmpty
      options={[
        { label: 'Todos', value: '1' },
        { label: 'Ativos', value: '2' },
        { label: 'Inativos', value: '3' }
      ]}
      label='Situação'
      name='ativo'
      onChange={action('onChange')}
      width='50%'
    />
  ))
  .add('with emptyValues', () => (
    <Field
      component={Select}
      emptyValue={{label: 'Nenhuma opção', value: null}}
      options={[
        { label: 'Todos', value: '1' },
        { label: 'Ativos', value: '2' },
        { label: 'Inativos', value: '3' }
      ]}
      label='Situação'
      name='allowEmptyFieldName'
      onChange={action('onChange')}
      width='50%'
    />
  ))
