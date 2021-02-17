import React from "react";
import Autocomplete from "../Common/Autocomplete";

export default function AutocompleteField({
  input,
  meta,
  textFieldProps,
  ...props
}) {
  return (
    <Autocomplete
      {...input}
      {...props}
      meta={meta}
      error={meta.error && meta.touched}
      textFieldProps={{
        ...textFieldProps,
        onBlur: input.onBlur,
        helperText: meta.touched && meta.error,
        error: meta.error && meta.touched
      }}
      helperText={meta.touched && meta.error}
      value={input.value}
      onBlur={input.onBlur}
      onChange={input.onChange}
    />
  );
}
