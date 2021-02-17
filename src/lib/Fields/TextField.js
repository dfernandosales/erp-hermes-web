import React from 'react'
import TextField from '@material-ui/core/TextField'

const CustomTextField = ({ input, onChange, meta, ...props }) => {
  if (!input || !meta) {
    throw Error('Sorry my friend. Did you forget field from final form?')
  }
  const handleChange = event => {
    onChange && onChange(event)
    input.onChange(event)
  }
  return (
    <TextField
      {...input}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      onChange={handleChange}
    />
  )
}

export default CustomTextField
