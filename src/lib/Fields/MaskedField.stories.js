import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import MaskedField from './MaskedField'

const Root = ({ children }) => (
  <Form initialValues={{ radio: 'taylor' }} onSubmit={() => {}}>
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Form>
)

storiesOf('MaskedField', module)
  .addDecorator((story, context) => <Root>{withInfo('Radio Field')(story)(context)}</Root>)
  .add('default', () => (
    <Field
      name='input'
      label='Telefone'
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      component={MaskedField}
      onChange={action('onChange')}
    />
  ))
