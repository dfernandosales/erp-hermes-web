import React from 'react'
import AutocompleteCreatable from '../Common/AutocompleteCreatable'

export default function AutocompleteCreatableField ({ input, meta, ...props }) {
  return (
    <AutocompleteCreatable
      {...input}
      {...props}
      meta={meta}
      error={meta.error && meta.touched}
      textFieldProps={{
        onBlur: input.onBlur,
        helperText: meta.touched && meta.error,
        error: meta.error && meta.touched
      }}
      helperText={meta.touched && meta.error}
      value={input.value}
      onBlur={input.onBlur}
      onChange={input.onChange}
    />
  )
}
