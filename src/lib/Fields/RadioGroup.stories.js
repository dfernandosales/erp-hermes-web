import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { Form, Field } from 'react-final-form'
import RadioGroup from './RadioGroup'

const Root = ({ children }) => (
  <Form initialValues={{ radio: 'taylor' }} onSubmit={() => {}}>
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Form>
)

storiesOf('RadioGroup', module)
  .addDecorator((story, context) => <Root>{withInfo('Radio Field')(story)(context)}</Root>)
  .add('default', () => (
    <Field
      name='radio'
      component={RadioGroup}
      onChange={action('onChange')}
      options={[
        { value: 'taylor', color: 'primary', label: 'Taylor' },
        { value: 'swift', color: 'secondary', label: 'Swift' }
      ]}
    />
  ))
  .add('row format', () => (
    <Field
      row
      name='radio'
      component={RadioGroup}
      onChange={action('onChange')}
      options={[
        { value: 'taylor', color: 'primary', label: 'Taylor' },
        { value: 'swift', color: 'secondary', label: 'Swift' }
      ]}
    />
  ))
  .add('without label and color', () => (
    <Field
      name='radio'
      component={RadioGroup}
      onChange={action('onChange')}
      options={[
        { value: 'taylor', color: 'primary' },
        { value: 'swift', color: 'secondary' },
        { value: 'aaa' }
      ]}
    />
  ))
  .add('empty', () => <Field name='radio' component={RadioGroup} onChange={action('onChange')} />)
