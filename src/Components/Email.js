import React from 'react'
import { Field } from 'react-final-form'
import { TextField } from '../lib/Fields'

const Email = props => {
  return (
    <Field
      name='email'
      label='E-mail'
      fullWidth
      component={TextField}
      {...props}
    />
  )
}
export default Email
